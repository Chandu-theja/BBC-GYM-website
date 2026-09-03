import type { Program } from "@/data/site";
import { accentClass } from "@/lib/accent";

export function ProgramCard({ program, detailed = false }: { program: Program; detailed?: boolean }) {
  const a = accentClass[program.accent];

  return (
    <article
      id={program.slug}
      className="group relative scroll-mt-28 overflow-hidden rounded-xl border border-ink-line bg-ink-raised p-6 transition-colors hover:border-smoke/40 sm:p-7"
    >
      <span className={`absolute inset-x-0 top-0 h-1 ${a.bar}`} aria-hidden="true" />
      <h3 className={`display text-2xl ${a.text}`}>{program.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-smoke">
        {detailed ? program.detail : program.summary}
      </p>
      {detailed && (
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {program.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-steel/85">
              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
