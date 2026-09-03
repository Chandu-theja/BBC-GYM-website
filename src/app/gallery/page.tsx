import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos of BBC Bouncers Fitness Gym on Karakambadi Road, Akkarampalli, Tirupati.",
  alternates: { canonical: "/gallery" },
};

/**
 * Only one owner-supplied photograph is currently usable (see README —
 * the others are Street View captures carrying Google's watermark). Rather than
 * padding the page with stock imagery that isn't this gym, empty slots are shown
 * honestly until real interior photographs are supplied.
 */
const photos = [
  {
    src: "/images/signage-wall.png",
    alt: "The BBC Bouncers Gym signage wall listing Ladies & Gents, Zumba Dance, Aerobics and CrossFit",
    caption: "The signage wall on Karakambadi Road",
    width: 996,
    height: 336,
    wide: true,
  },
];

const pendingSlots = ["Main weights floor", "Cardio section", "CrossFit rig", "Ladies' batch area", "Reception"];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={<>Inside the<br />training floor.</>}
        lead="A look at the equipment, the space and the batches. Drop in any day between opening and closing to see it yourself."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <figure
              key={photo.src}
              className={`overflow-hidden rounded-xl border border-ink-line bg-ink-raised ${
                photo.wide ? "sm:col-span-2" : ""
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 700px"
                className="w-full contrast-[1.15] saturate-[1.2]"
              />
              <figcaption className="px-5 py-3.5 text-sm text-smoke">{photo.caption}</figcaption>
            </figure>
          ))}

          {pendingSlots.map((label) => (
            <div
              key={label}
              className="flex aspect-4/3 flex-col items-center justify-center rounded-xl border border-dashed border-ink-line bg-ink-raised/40 px-5 text-center"
            >
              <svg viewBox="0 0 24 24" className="h-8 w-8 fill-smoke/30" aria-hidden="true">
                <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v8.6l3.6-3.6 3 3L15 10l4 4V7H5Zm3.5 1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
              <p className="mt-3 text-sm font-medium text-smoke/70">{label}</p>
              <p className="mt-1 text-xs text-smoke/50">Photo coming soon</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-xl border border-ink-line bg-ink-raised p-7 text-center sm:p-9">
          <p className="text-smoke">
            Want to see the floor in person before joining? Walk in any day, or call{" "}
            <a href={`tel:${site.phone}`} className="font-semibold text-signal-yellow hover:underline">
              {site.phoneDisplay}
            </a>
            .
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full flame-bg px-8 py-3 font-bold text-ink transition-transform hover:scale-[1.03]"
          >
            Book a free trial
          </Link>
        </div>
      </section>
    </>
  );
}
