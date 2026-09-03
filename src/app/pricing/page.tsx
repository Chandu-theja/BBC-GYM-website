import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PriceCard } from "@/components/PriceCard";
import { plans, PRICES_CONFIRMED, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Monthly, quarterly, half-yearly and annual gym memberships at BBC Bouncers Fitness Gym, Karakambadi Road, Tirupati.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title={<>Plans that<br />fit the year.</>}
        lead="Every plan covers the full gym floor and all cardio equipment. The longer stretches add coaching, nutrition and tracking on top."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        {!PRICES_CONFIRMED && (
          <p className="mb-10 rounded-lg border border-signal-yellow/40 bg-signal-yellow/10 px-5 py-4 text-sm text-steel">
            <strong className="font-semibold">Current rates are confirmed at the desk.</strong> Call{" "}
            <a href={`tel:${site.phone}`} className="font-semibold text-signal-yellow hover:underline">
              {site.phoneDisplay}
            </a>{" "}
            or drop in — we&apos;ll walk you through what each plan includes.
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PriceCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="mt-14 rounded-xl border border-ink-line bg-ink-raised p-7 sm:p-9">
          <h2 className="display text-2xl text-steel">Included in every plan</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Full free-weight and machine floor",
              "All cardio equipment",
              "Joining fitness assessment",
              "Ladies' batch access",
              "Locker and changing area",
              "Coach on the floor at all hours",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-steel/85">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flame-orange" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="mt-7 inline-block font-semibold text-flame-amber hover:underline">
            Ask about a free trial session →
          </Link>
        </div>
      </section>
    </>
  );
}
