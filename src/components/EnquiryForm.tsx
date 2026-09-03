"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitEnquiry, type EnquiryState } from "@/app/actions";
import { programs, site, whatsappLink } from "@/data/site";

const GOALS = ["Fat loss", "Muscle gain", "General fitness", "Strength", "Stamina"];

const fieldBase =
  "w-full rounded-lg border bg-ink px-4 py-3 text-steel placeholder:text-smoke/60 focus:border-flame-orange focus:outline-none";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full flame-bg py-3.5 font-bold text-ink transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send enquiry"}
    </button>
  );
}

export function EnquiryForm() {
  const [state, action] = useActionState<EnquiryState, FormData>(submitEnquiry, { status: "idle" });

  if (state.status === "ok") {
    return (
      <div className="rounded-xl border border-gym-green/40 bg-gym-green/10 p-8 text-center">
        <h3 className="display text-3xl text-steel">Got it.</h3>
        <p className="mt-3 text-smoke">
          We&apos;ll call you back on the number you gave us. In a hurry? Ring{" "}
          <a href={`tel:${site.phone}`} className="font-semibold text-signal-yellow hover:underline">
            {site.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const err = (k: string) => errors[k];
  // Repopulate after React 19 resets the uncontrolled fields on action completion.
  const v = state.values ?? {};

  return (
    <form action={action} className="space-y-4" noValidate>
      {state.status === "fallback" && (
        <div className="rounded-lg border border-signal-yellow/40 bg-signal-yellow/10 p-4">
          <p className="text-sm text-steel">{state.message}</p>
          <a
            href={whatsappLink(state.prefill)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white"
          >
            Send on WhatsApp
          </a>
        </div>
      )}

      {state.status === "error" && !Object.keys(errors).length && (
        <p className="rounded-lg border border-flame-red/40 bg-flame-red/10 p-4 text-sm text-steel">{state.message}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" error={err("name")}>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Full name"
            defaultValue={v.name ?? ""}
            className={`${fieldBase} ${err("name") ? "border-flame-red" : "border-ink-line"}`}
          />
        </Field>
        <Field label="Mobile number" name="phone" error={err("phone")}>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="numeric"
            autoComplete="tel"
            placeholder="10-digit number"
            defaultValue={v.phone ?? ""}
            className={`${fieldBase} ${err("phone") ? "border-flame-red" : "border-ink-line"}`}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Interested in" name="program">
          <select id="program" name="program" defaultValue={v.program ?? ""} className={`${fieldBase} border-ink-line`}>
            <option value="">Not sure yet</option>
            {programs.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Your goal" name="goal">
          <select id="goal" name="goal" defaultValue={v.goal ?? ""} className={`${fieldBase} border-ink-line`}>
            <option value="">Not sure yet</option>
            {GOALS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Anything else? (optional)" name="message">
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Preferred timings, questions about plans…"
          defaultValue={v.message ?? ""}
          className={`${fieldBase} resize-y border-ink-line`}
        />
      </Field>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Submit />
      <p className="text-center text-xs text-smoke">
        We use your number only to call you back about membership.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-steel/85">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-flame-red">
          {error}
        </p>
      )}
    </div>
  );
}
