import Link from "next/link";
import type { Plan } from "@/data/site";
import { PRICES_CONFIRMED } from "@/data/site";

export function PriceCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={`relative flex flex-col rounded-xl border p-6 sm:p-7 ${
        plan.featured
          ? "border-gold/50 bg-ink-raised shadow-lg shadow-gold/5"
          : "border-ink-line bg-ink-raised"
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-ink">
          Most popular
        </span>
      )}

      <h3 className="display text-2xl text-bone">{plan.name}</h3>
      <p className="mt-1 text-sm text-muted">
        {plan.months} {plan.months === 1 ? "month" : "months"}
      </p>

      <p className="mt-6">
        {plan.price !== null && PRICES_CONFIRMED ? (
          <>
            <span className="display text-4xl text-gold">₹{plan.price.toLocaleString("en-IN")}</span>
            <span className="ml-1 text-sm text-muted">/ {plan.months} mo</span>
          </>
        ) : (
          <span className="display text-3xl text-muted">Ask at the desk</span>
        )}
      </p>

      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2.5 text-sm text-bone/85">
            <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 fill-gold" aria-hidden="true">
              <path d="M8.2 13.6 4.9 10.3l1.2-1.2 2.1 2.1 5.7-5.7 1.2 1.2z" />
            </svg>
            {perk}
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`mt-7 rounded-full py-3 text-center text-sm font-bold transition-colors hover:bg-gold/90 ${
          plan.featured ? "bg-gold text-ink hover:bg-gold/90" : "border border-ink-line text-bone hover:border-muted/50"
        }`}
      >
        Enquire
      </Link>
    </article>
  );
}
