import type { Metadata } from "next";
import Link from "next/link";
import { SignagePanel } from "@/components/SignagePanel";
import { PhotoGallery } from "@/components/PhotoGallery";
import { PageHeader } from "@/components/PageHeader";
import { site, photos, photoSlots } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos of BBC Bouncers Fitness Gym on Karakambadi Road, Akkarampalli, Tirupati.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={<>Inside the<br />training floor.</>}
        lead="A look at the equipment, the space and the batches. Drop in any day between opening and closing to see it yourself."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <SignagePanel className="mb-5" />

        <PhotoGallery photos={photos} slots={photoSlots} />

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
