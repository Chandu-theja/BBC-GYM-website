import type { Coach } from "@/data/site";

export function CoachCard({ coach }: { coach: Coach }) {
  const senior = coach.tier === "senior";

  return (
    <article
      className={`rounded-xl border bg-ink-raised p-6 transition-colors ${
        senior ? "border-flame-orange/30 hover:border-flame-orange/60" : "border-ink-line hover:border-smoke/40"
      }`}
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold ${
          senior ? "flame-bg text-ink" : "bg-ink-line text-smoke"
        }`}
        aria-hidden="true"
      >
        {coach.name.charAt(0)}
      </div>
      <h3 className="display mt-5 text-2xl text-steel">{coach.name}</h3>
      <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.2em] ${senior ? "text-flame-amber" : "text-smoke"}`}>
        {coach.role}
      </p>
      <p className="mt-3 text-sm text-smoke">{coach.focus}</p>
    </article>
  );
}

/** Placeholder tile for a junior coach slot the owner has not named yet. */
export function CoachSlot() {
  return (
    <article className="rounded-xl border border-dashed border-ink-line bg-ink-raised/40 p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-smoke/40 text-xl text-smoke/50" aria-hidden="true">
        ?
      </div>
      <h3 className="display mt-5 text-2xl text-smoke/60">Coach</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-smoke/50">Junior Coach</p>
      <p className="mt-3 text-sm text-smoke/60">Name to be added.</p>
    </article>
  );
}
