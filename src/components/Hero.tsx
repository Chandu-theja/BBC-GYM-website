import Link from "next/link";
import { SignagePanel } from "./SignagePanel";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-14 sm:pb-20 sm:pt-20">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted">
          <span>Akkarampalli · Tirupati</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-line px-2.5 py-1 tracking-normal">
            <span className="text-gold">★</span>
            <span className="text-bone">{site.rating.value}</span>
            <span className="font-normal normal-case tracking-normal text-muted">
              · {site.rating.count} reviews
            </span>
          </span>
        </p>

        <h1 className="display mt-7 text-[2.75rem] sm:text-6xl lg:text-7xl">
          <span className="block text-bone">Bouncers</span>
          <span className="block text-gold">Fitness Gym</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          Ladies &amp; gents training floor on Karakambadi Road. Strength, CrossFit, Zumba,
          aerobics and one-to-one coaching — open {formatShort(site.hours.opens)} to{" "}
          {formatShort(site.hours.closes)}, seven days.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-gold px-8 py-3.5 text-center font-bold text-ink transition-colors hover:bg-gold/90"
          >
            Book a free trial
          </Link>
          <a
            href={`tel:${site.phone}`}
            className="rounded-full border border-ink-line px-8 py-3.5 text-center font-semibold text-bone transition-colors hover:border-muted/50"
          >
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-16 sm:pb-20">
        <SignagePanel variant="disciplines" />
      </div>
    </section>
  );
}

function formatShort(hhmm: string) {
  const h = Number(hhmm.split(":")[0]);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${h % 12 === 0 ? 12 : h % 12} ${suffix}`;
}
