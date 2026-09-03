import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EnquiryForm } from "@/components/EnquiryForm";
import { MapEmbed } from "@/components/MapEmbed";
import { formatHour } from "@/components/Footer";
import { site, fullAddress, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Enquire about membership at BBC Bouncers Fitness Gym, ${fullAddress}. Call ${site.phoneDisplay}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Leave your<br />number.</>}
        lead="Fill this in and it opens WhatsApp with your details already typed — press send and we'll reply with batch timings and current rates."
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="display text-3xl text-steel">Membership enquiry</h2>
          <p className="mt-3 text-smoke">Thirty seconds, no typing it out twice. No payment details, no spam.</p>
          <div className="mt-8">
            <EnquiryForm />
          </div>
        </div>

        <aside className="space-y-8">
          <div className="rounded-xl border border-ink-line bg-ink-raised p-7">
            <h2 className="display text-2xl text-steel">Reach us directly</h2>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">Phone</dt>
                <dd className="mt-1.5">
                  <a href={`tel:${site.phone}`} className="text-xl font-bold text-signal-yellow hover:underline">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">WhatsApp</dt>
                <dd className="mt-1.5">
                  <a
                    href={whatsappLink(`Hi ${site.shortName}, I'd like to know about membership plans and batch timings.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#25D366] hover:underline"
                  >
                    Start a chat →
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">Address</dt>
                <dd className="mt-1.5 text-steel/85">{fullAddress}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">Hours</dt>
                <dd className="mt-1.5 text-steel/85">
                  {formatHour(site.hours.opens)} – {formatHour(site.hours.closes)}
                  <br />
                  <span className="text-smoke">{site.hours.note}</span>
                </dd>
              </div>
            </dl>
          </div>

          <MapEmbed />
        </aside>
      </section>
    </>
  );
}
