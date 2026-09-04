import Link from "next/link";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center">
      <p className="display text-7xl text-gold">404</p>
      <h1 className="display mt-4 text-3xl text-bone">Page not found.</h1>
      <p className="mt-3 text-muted">That page isn&apos;t on the floor. Head back to the front desk.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="rounded-full bg-gold px-7 py-3 font-bold text-ink">
          Back to home
        </Link>
        <a
          href={`tel:${site.phone}`}
          className="rounded-full border border-ink-line px-7 py-3 font-semibold text-bone hover:border-muted/50"
        >
          Call {site.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
