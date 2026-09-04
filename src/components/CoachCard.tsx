import type { Coach } from "@/data/site";

export function CoachCard({ coach }: { coach: Coach }) {
  const senior = coach.tier === "senior";

  return (
    <article
      className={`rounded-xl border bg-ink-raised p-6 transition-colors ${
        senior ? "border-gold/30 hover:border-gold/60" : "border-ink-line hover:border-muted/40"
      }`}
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold ${
          senior ? "bg-gold text-ink hover:bg-gold/90" : "bg-ink-line text-muted"
        }`}
        aria-hidden="true"
      >
        {coach.name.charAt(0)}
      </div>
      <h3 className="display mt-5 text-2xl text-bone">{coach.name}</h3>
      <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.2em] ${senior ? "text-gold" : "text-muted"}`}>
        {coach.role}
      </p>
      <p className="mt-3 text-sm text-muted">{coach.focus}</p>
    </article>
  );
}

/** Placeholder tile for a junior coach slot the owner has not named yet. */
export function CoachSlot() {
  return (
    <article className="rounded-xl border border-dashed border-ink-line bg-ink-raised/40 p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-muted/40 text-xl text-muted" aria-hidden="true">
        ?
      </div>
      <h3 className="display mt-5 text-2xl text-muted">Coach</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Junior Coach</p>
      <p className="mt-3 text-sm text-muted">Name to be added.</p>
    </article>
  );
}
