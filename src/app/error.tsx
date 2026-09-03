"use client";

import Link from "next/link";
import { useEffect } from "react";
import { site } from "@/data/site";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[page error]", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center">
      <p className="display text-6xl flame-text">Oops</p>
      <h1 className="display mt-4 text-3xl text-steel">Something went wrong.</h1>
      <p className="mt-3 text-smoke">
        Try again in a moment. If you need us right now, just call — we always pick up.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={reset} className="rounded-full flame-bg px-7 py-3 font-bold text-ink">
          Try again
        </button>
        <a
          href={`tel:${site.phone}`}
          className="rounded-full border border-ink-line px-7 py-3 font-semibold text-steel hover:border-smoke/50"
        >
          Call {site.phoneDisplay}
        </a>
      </div>
      <Link href="/" className="mt-6 text-sm text-smoke underline hover:text-steel">
        Back to home
      </Link>
    </div>
  );
}
