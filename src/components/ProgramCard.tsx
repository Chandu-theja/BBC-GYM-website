import type { Program } from "@/data/site";

export function ProgramCard({ program, detailed = false }: { program: Program; detailed?: boolean }) {
  return (
    <article
      id={program.slug}
      className="group relative scroll-mt-28 overflow-hidden rounded-xl border border-ink-line bg-ink-raised p-6 transition-colors hover:border-muted/40 sm:p-7"
    >
      <span className="absolute inset-x-0 top-0 h-px bg-gold/0 transition-colors group-hover:bg-gold/50" aria-hidden="true" />
      <h3 className="display text-2xl text-bone">{program.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {detailed ? program.detail : program.summary}
      </p>
      {detailed && (
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {program.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-bone/85">
              <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
