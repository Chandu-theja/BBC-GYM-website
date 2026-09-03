import Link from "next/link";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { SectionHeading } from "@/components/SectionHeading";
import { ProgramCard } from "@/components/ProgramCard";
import { CoachCard } from "@/components/CoachCard";
import { PriceCard } from "@/components/PriceCard";
import { MapEmbed } from "@/components/MapEmbed";
import { PhotoGallery } from "@/components/PhotoGallery";
import { site, fullAddress, programs, coaches, plans, photos, photoSlots } from "@/data/site";
import { formatHour } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionHeading
          eyebrow="What we run"
          title={<>Every discipline<br />on the wall.</>}
          lead="The signage outside isn't decoration — each of those colours is a program running on the floor this week."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.slice(0, 6).map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>
        <Link
          href="/programs"
          className="mt-8 inline-block font-semibold text-flame-amber hover:underline"
        >
          See all programs in detail →
        </Link>
      </section>

      <section className="border-t border-ink-line bg-ink-raised">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Who coaches you"
            title="Senior coaches on the floor."
            lead="Not a card-swipe gym. Someone who knows your programme is there while you train."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coaches.map((c) => (
              <CoachCard key={c.name} coach={c} />
            ))}
          </div>
          <Link href="/coaches" className="mt-8 inline-block font-semibold text-flame-amber hover:underline">
            Meet the full coaching team →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionHeading
          eyebrow="Membership"
          title="Pick a stretch, not a subscription."
          lead="Longer commitments unlock coaching extras. Walk in for a free trial session before you decide anything."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PriceCard key={plan.name} plan={plan} />
          ))}
        </div>
      </section>

      <section className="border-t border-ink-line bg-ink-raised">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Find us"
              title={<>Opposite Bharat<br />Petroleum.</>}
              lead="On Karakambadi Road in Akkarampalli — you'll spot the signage wall before you spot the door."
            />
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">Address</dt>
                <dd className="mt-1.5 text-steel">{fullAddress}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">Hours</dt>
                <dd className="mt-1.5 text-steel">
                  {formatHour(site.hours.opens)} – {formatHour(site.hours.closes)} · {site.hours.note}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">Phone</dt>
                <dd className="mt-1.5">
                  <a href={`tel:${site.phone}`} className="text-lg font-bold text-signal-yellow hover:underline">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full border border-ink-line px-7 py-3 font-semibold text-steel transition-colors hover:border-smoke/50"
            >
              Open in Google Maps
            </a>
          </div>
          <MapEmbed />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <SectionHeading
          eyebrow="See the gym"
          title="Have a look around."
          lead="The floor, the equipment and the batches — before you walk in."
        />
        <div className="mt-10">
          <PhotoGallery photos={photos} slots={photoSlots} limit={6} />
        </div>
        {photos.length > 6 && (
          <Link href="/gallery" className="mt-8 inline-block font-semibold text-brand-gold hover:underline">
            See every photo →
          </Link>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="relative overflow-hidden rounded-2xl border border-flame-orange/30 bg-ink-raised px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-64 w-[600px] opacity-20 blur-[80px]"
            style={{ background: "radial-gradient(closest-side, #F58220, transparent)" }}
          />
          <h2 className="display relative text-4xl text-steel sm:text-5xl">
            First session is on us.
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-smoke">
            Come try the floor before you pay for anything. Leave your number and we&apos;ll call you back with
            batch timings that fit your day.
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full flame-bg px-8 py-3.5 font-bold text-ink transition-transform hover:scale-[1.03]"
            >
              Enquire about membership
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="rounded-full border border-ink-line px-8 py-3.5 font-semibold text-steel transition-colors hover:border-smoke/50"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
