const disciplines = ["Ladies & Gents", "Zumba Dance", "Aerobics", "CrossFit"];

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
        style={{ background: "radial-gradient(120% 90% at 50% -20%, rgba(205,172,125,0.06), transparent 70%)" }}
      />

      {variant === "disciplines" ? (
        <div className="relative px-6 py-8 sm:px-10 sm:py-10">
          <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-3 sm:gap-x-12">
            {disciplines.map((label) => (
              <li
                key={label}
                className="display leading-none text-bone"
                style={{ fontSize: "clamp(1.25rem, 3.4vw, 2rem)" }}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      ) : (
      <div className="relative flex flex-col gap-6 px-6 py-9 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:px-10 sm:py-12">
        <div>
          <p
            className="display leading-[0.9] text-bone"
            style={{ fontSize: "clamp(2.25rem, 7vw, 4.25rem)" }}
          >
            Bouncers
          </p>
          <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            {disciplines.map((label) => (
              <li key={label} className="text-[0.78rem] tracking-[0.14em] uppercase text-muted sm:text-sm">
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:text-right">
          <p
            className="display leading-[0.9] text-bone"
            style={{ fontSize: "clamp(2.25rem, 7vw, 4.25rem)" }}
          >
            Gym
          </p>
          <p
            className="display leading-[0.9] text-gold"
            style={{ fontSize: "clamp(1.25rem, 3.5vw, 2rem)" }}
          >
            Fitness
          </p>
        </div>
      </div>
      )}
    </div>
  );
}
