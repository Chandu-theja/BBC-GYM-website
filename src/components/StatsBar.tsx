import { site } from "@/data/site";
import { formatHour } from "./Footer";

const stats = [
  { value: `${site.rating.value}★`, label: `${site.rating.count} Google reviews` },
  { value: `${formatHour(site.hours.opens)}–${formatHour(site.hours.closes)}`, label: site.hours.note },
  { value: "Ladies & Gents", label: "Separate batch timings" },
  { value: "5 Programs", label: "Gym · CrossFit · Zumba · Aerobics · Cardio" },
];

export function StatsBar() {
  return (
    <section className="border-y border-ink-line bg-ink-raised" aria-label="At a glance">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-ink-line lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-ink-raised px-5 py-7 text-center sm:py-9">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="display block text-xl text-bone sm:text-2xl">{s.value}</span>
              <span className="mt-1.5 block text-[0.7rem] leading-snug text-muted sm:text-xs">{s.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
