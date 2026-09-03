"use client";

import { useMemo, useRef, useState } from "react";
import { buildWhatsAppMessage, enquirySchema, whatsappHref } from "@/lib/enquiry";
import { programs, site } from "@/data/site";

const GOALS = ["Fat loss", "Muscle gain", "General fitness", "Strength", "Stamina"];

const EMPTY = { name: "", phone: "", program: "", goal: "", message: "", website: "" };
type Values = typeof EMPTY;

const fieldBase =
  "w-full rounded-lg border bg-ink px-4 py-3 text-steel placeholder:text-smoke/60 focus:border-flame-orange focus:outline-none";

/**
 * Enquiry form that hands off to WhatsApp with everything already filled in.
 *
 * The submit control is a real <a href="https://wa.me/...">, not a button that
 * opens a window after awaiting something. That is deliberate: a popup opened
 * after an await has lost the user-gesture context and gets blocked, whereas a
 * plain link click never is. The href is rebuilt as the visitor types, so it is
 * always current at the moment they click.
 *
 * Saving the lead to our own database happens alongside, fire-and-forget, so a
 * slow or failing request can never delay or break the handoff.
 */
export function EnquiryForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [sent, setSent] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const href = useMemo(() => whatsappHref(buildWhatsAppMessage(values)), [values]);

  function validate() {
    const parsed = enquirySchema.safeParse(values);
    if (parsed.success) return true;
    const next: Partial<Record<keyof Values, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof Values;
      next[key] ??= issue.message;
    }
    setErrors(next);
    return false;
  }

  function handleSubmitClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!validate()) {
      e.preventDefault();
      return;
    }
    // Record the lead without awaiting; keepalive lets it finish regardless.
    void fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      keepalive: true,
    }).catch(() => {});
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-gym-green/40 bg-gym-green/10 p-8 text-center">
        <h3 className="display text-3xl text-steel">WhatsApp is open.</h3>
        <p className="mt-3 text-smoke">
          Your details are already typed in — just press send and we&apos;ll reply.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white"
          >
            Didn&apos;t open? Tap here
          </a>
          <a
            href={`tel:${site.phone}`}
            className="rounded-full border border-ink-line px-6 py-3 text-sm font-semibold text-steel hover:border-smoke/50"
          >
            Or call {site.phoneDisplay}
          </a>
        </div>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setSent(false);
          }}
          className="mt-6 text-sm text-smoke underline hover:text-steel"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        // Enter-to-submit: forward to the link so the click stays inside the gesture.
        e.preventDefault();
        linkRef.current?.click();
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" error={errors.name}>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={set("name")}
            autoComplete="name"
            placeholder="Full name"
            className={`${fieldBase} ${errors.name ? "border-flame-red" : "border-ink-line"}`}
          />
        </Field>
        <Field label="Mobile number" name="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            value={values.phone}
            onChange={set("phone")}
            autoComplete="tel"
            placeholder="10-digit number"
            className={`${fieldBase} ${errors.phone ? "border-flame-red" : "border-ink-line"}`}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Interested in" name="program">
          <select id="program" name="program" value={values.program} onChange={set("program")} className={`${fieldBase} border-ink-line`}>
            <option value="">Not sure yet</option>
            {programs.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Your goal" name="goal">
          <select id="goal" name="goal" value={values.goal} onChange={set("goal")} className={`${fieldBase} border-ink-line`}>
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
          value={values.message}
          onChange={set("message")}
          placeholder="Preferred timings, questions about plans…"
          className={`${fieldBase} resize-y border-ink-line`}
        />
      </Field>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
      </div>

      <a
        ref={linkRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleSubmitClick}
        className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-3.5 font-bold text-white transition-transform hover:scale-[1.01]"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.29-.77.95-.94 1.15-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.29-.02-.45.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35ZM12.04 21.5h-.01a9.44 9.44 0 0 1-4.8-1.32l-.35-.2-3.57.93.96-3.48-.23-.36a9.4 9.4 0 0 1-1.44-5.03c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 6.67 2.77 9.36 9.36 0 0 1 2.76 6.68c0 5.2-4.24 9.45-9.44 9.45ZM20.5 3.49A11.8 11.8 0 0 0 12.04 0C5.5 0 .2 5.31.2 11.84c0 2.09.55 4.13 1.59 5.93L.1 24l6.37-1.67a11.8 11.8 0 0 0 5.66 1.44h.01c6.53 0 11.84-5.31 11.84-11.84 0-3.16-1.23-6.14-3.47-8.38Z" />
        </svg>
        Send on WhatsApp
      </a>

      <p className="text-center text-xs text-smoke">
        Opens WhatsApp with your details already filled in — you just press send.
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
