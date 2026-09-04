import Link from "next/link";
import { Logo } from "./Logo";
import { site, fullAddress, programs } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink-raised">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="lg:col-span-1">
          <Logo variant="lockup" className="h-auto w-56 max-w-full" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            Ladies &amp; gents fitness centre on Karakambadi Road, training Tirupati since day one.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Programs</h2>
          <ul className="mt-4 space-y-2.5">
            {programs.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link href={`/programs#${p.slug}`} className="text-sm text-bone/80 transition-colors hover:text-gold">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Visit</h2>
          <address className="mt-4 text-sm not-italic leading-relaxed text-bone/80">
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
            className="mt-3 inline-block text-sm font-medium text-gold hover:underline"
          >
            Get directions →
          </a>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={`tel:${site.phone}`} className="font-semibold text-gold hover:underline">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="text-bone/80">
              {formatHour(site.hours.opens)} – {formatHour(site.hours.closes)}
              <br />
              <span className="text-muted">{site.hours.note}</span>
            </li>
            <li>
              <Link href="/contact" className="font-medium text-gold hover:underline">
                Enquire about membership →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>{fullAddress}</p>
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
