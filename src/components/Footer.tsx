import Link from "next/link";
import { BbcLogo } from "./BbcLogo";
import { site, fullAddress, programs } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink-raised">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="lg:col-span-1">
          <BbcLogo className="h-24 w-auto text-steel" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-smoke">
            Ladies &amp; gents fitness centre on Karakambadi Road, training Tirupati since day one.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">Programs</h2>
          <ul className="mt-4 space-y-2.5">
            {programs.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link href={`/programs#${p.slug}`} className="text-sm text-steel/80 transition-colors hover:text-flame-amber">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">Visit</h2>
          <address className="mt-4 text-sm not-italic leading-relaxed text-steel/80">
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.city} {site.address.postalCode}
          </address>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-flame-amber hover:underline"
          >
            Get directions →
          </a>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={`tel:${site.phone}`} className="font-semibold text-signal-yellow hover:underline">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="text-steel/80">
              {formatHour(site.hours.opens)} – {formatHour(site.hours.closes)}
              <br />
              <span className="text-smoke">{site.hours.note}</span>
            </li>
            <li>
              <Link href="/contact" className="font-medium text-flame-amber hover:underline">
                Enquire about membership →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="font-telugu">{site.taglineTe}</p>
        </div>
      </div>
    </footer>
  );
}

export function formatHour(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`;
}
