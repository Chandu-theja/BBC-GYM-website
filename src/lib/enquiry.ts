import { z } from "zod";
import { programs, site } from "@/data/site";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .pipe(z.string().regex(/^(\+91)?[6-9]\d{9}$/, "Enter a valid 10-digit mobile number.")),
  program: z.string().trim().max(60).optional(),
  goal: z.string().trim().max(60).optional(),
  message: z.string().trim().max(1000).optional(),
  // Honeypot: real people never see or fill this.
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;

/**
 * The message the visitor sends us on WhatsApp.
 *
 * Everything they typed into the form goes in here verbatim, so the handoff
 * costs them nothing — they open WhatsApp and press send. Retyping their own
 * name and number into a chat is exactly the friction the form exists to remove.
 */
export function buildWhatsAppMessage(v: {
  name?: string;
  phone?: string;
  program?: string;
  goal?: string;
  message?: string;
}) {
  const programName = programs.find((p) => p.slug === v.program)?.name ?? v.program;
  return [
    `Hi ${site.shortName}, I'd like to join.`,
    "",
    `Name: ${v.name ?? ""}`,
    `Phone: ${v.phone ?? ""}`,
    programName ? `Program: ${programName}` : null,
    v.goal ? `Goal: ${v.goal}` : null,
    v.message ? `Note: ${v.message}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function whatsappHref(message: string) {
  return `https://wa.me/${site.phone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}
