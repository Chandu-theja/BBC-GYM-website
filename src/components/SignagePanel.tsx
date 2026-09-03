const disciplines = [
  { label: "Ladies & Gents", className: "text-signal-yellow" },
  { label: "Zumba Dance", className: "text-steel" },
  { label: "Aerobics", className: "text-gym-green" },
  { label: "CrossFit", className: "text-crossfit-blue" },
];

/**
 * A typographic recreation of the gym's signage wall on Karakambadi Road.
 *
 * This replaces a low-resolution photograph of that wall. Redrawing it as type
 * keeps the exact colour-coding of each discipline — which is the brand — while
 * staying sharp at any width and adding no image weight to the page.
 */
type Props = {
  className?: string;
  /**
   * "full" reproduces the whole sign, name included — right for the gallery.
   * "disciplines" drops the name and shows only the colour-coded programs, so it
   * can sit under the hero heading without saying "Bouncers Gym" twice.
   */
  variant?: "full" | "disciplines";
};

export function SignagePanel({ className = "", variant = "full" }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-ink-line bg-ink-raised ${className}`}
      role="img"
      aria-label={
        variant === "full"
          ? "Bouncers Gym Fitness — Ladies & Gents, Zumba Dance, Aerobics, CrossFit"
          : "Ladies & Gents, Zumba Dance, Aerobics, CrossFit"
      }
    >
      {/* Vertical banding, echoing the corrugated panels the real sign is mounted on. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.028) 0 1px, transparent 1px 26px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% -20%, rgba(245,130,32,0.10), transparent 70%)" }}
      />

      {variant === "disciplines" ? (
        <div className="relative px-6 py-8 sm:px-10 sm:py-10">
          <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-3 sm:gap-x-12">
            {disciplines.map((d) => (
              <li
                key={d.label}
                className={`display leading-none ${d.className}`}
                style={{ fontSize: "clamp(1.5rem, 4.6vw, 2.75rem)" }}
              >
                {d.label}
              </li>
            ))}
          </ul>
        </div>
      ) : (
      <div className="relative flex flex-col gap-6 px-6 py-9 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:px-10 sm:py-12">
        <div>
          <p
            className="display leading-[0.82] text-flame-red"
            style={{ fontSize: "clamp(2.75rem, 10vw, 6rem)" }}
          >
            Bouncers
          </p>
          <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            {disciplines.map((d) => (
              <li
                key={d.label}
                className={`display text-[0.78rem] tracking-[0.06em] sm:text-base ${d.className}`}
              >
                {d.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:text-right">
          <p
            className="display leading-[0.82] text-steel"
            style={{ fontSize: "clamp(2.75rem, 10vw, 6rem)" }}
          >
            Gym
          </p>
          <p
            className="display leading-[0.9] text-flame-orange"
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.75rem)" }}
          >
            Fitness
          </p>
        </div>
      </div>
      )}
    </div>
  );
}
