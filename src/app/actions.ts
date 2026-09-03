"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { allow } from "@/lib/rate-limit";
import { programs } from "@/data/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .pipe(z.string().regex(/^(\+91)?[6-9]\d{9}$/, "Enter a valid 10-digit mobile number.")),
  program: z.string().trim().max(60).optional().or(z.literal("")),
  goal: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  // Honeypot: real users never see or fill this.
  website: z.string().max(0).optional(),
});

/**
 * React 19 resets uncontrolled inputs once a form action resolves, so anything
 * the visitor typed would vanish on a validation error. Every non-success state
 * carries the submitted values back so the form can repopulate itself.
 */
export type SubmittedValues = {
  name?: string;
  phone?: string;
  program?: string;
  goal?: string;
  message?: string;
};

export type EnquiryState =
  | { status: "idle"; values?: SubmittedValues }
  | { status: "ok" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string>; values: SubmittedValues }
  /** DB unavailable — the client hands the visitor off to WhatsApp so the lead survives. */
  | { status: "fallback"; message: string; prefill: string; values: SubmittedValues };

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const raw = Object.fromEntries(formData);
  const values: SubmittedValues = {
    name: str(raw.name),
    phone: str(raw.phone),
    program: str(raw.program),
    goal: str(raw.goal),
    message: str(raw.message),
  };

  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const { name, phone, program, goal, message, website } = parsed.data;
  if (website) return { status: "ok" }; // Bot: accept silently, store nothing.

  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allow(ip)) {
    return { status: "error", message: "Too many enquiries from this device. Please call us instead.", values };
  }

  const prefill = buildPrefill({ name, phone, program, goal, message });
  const sql = getSql();

  if (!sql) {
    return {
      status: "fallback",
      message: "Our form is offline right now — send this on WhatsApp instead and we'll reply straight away.",
      prefill,
      values,
    };
  }

  try {
    await sql`
      insert into enquiries (name, phone, program, goal, message)
      values (${name}, ${phone}, ${program || null}, ${goal || null}, ${message || null})
    `;
    return { status: "ok" };
  } catch (error) {
    console.error("[enquiry] insert failed", error);
    return {
      status: "fallback",
      message: "We couldn't save that just now — send it on WhatsApp instead and we'll reply straight away.",
      prefill,
      values,
    };
  }
}

function str(v: FormDataEntryValue | undefined) {
  return typeof v === "string" ? v : undefined;
}

function buildPrefill(v: { name: string; phone: string; program?: string; goal?: string; message?: string }) {
  const label = programs.find((p) => p.slug === v.program)?.name ?? v.program;
  return [
    `Hi BBC Bouncers, I'd like to join.`,
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    label ? `Program: ${label}` : null,
    v.goal ? `Goal: ${v.goal}` : null,
    v.message ? `Note: ${v.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
