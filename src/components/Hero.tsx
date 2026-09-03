import Link from "next/link";
import { SignagePanel } from "./SignagePanel";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Flame glow behind the wordmark, the one piece of colour on the fold. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 opacity-[0.18] blur-[90px]"
        style={{ background: "radial-gradient(closest-side, #F58220, #E1251B 55%, transparent)" }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-14 sm:pb-20 sm:pt-20">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.28em] text-smoke">
          <span>Akkarampalli · Tirupati</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-line px-2.5 py-1 tracking-normal">
            <span className="text-signal-yellow">★</span>
            <span className="text-steel">{site.rating.value}</span>
            <span className="font-normal normal-case tracking-normal text-smoke">
              · {site.rating.count} reviews
            </span>
          </span>
        </p>

        <h1 className="display mt-6 text-[3.25rem] leading-[0.88] sm:text-8xl lg:text-[7.5rem]">
          <span className="block text-steel">Bouncers</span>
          <span className="block flame-text">Fitness Gym</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-smoke sm:text-xl">
          Ladies &amp; gents training floor on Karakambadi Road. Strength, CrossFit, Zumba,
          aerobics and one-to-one coaching — open {formatShort(site.hours.opens)} to{" "}
          {formatShort(site.hours.closes)}, seven days.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full flame-bg px-8 py-3.5 text-center font-bold text-ink transition-transform hover:scale-[1.03]"
          >
            Book a free trial
          </Link>
          <a
            href={`tel:${site.phone}`}
            className="rounded-full border border-ink-line px-8 py-3.5 text-center font-semibold text-steel transition-colors hover:border-smoke/50"
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
