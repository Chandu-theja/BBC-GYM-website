"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/data/site";
import { Lightbox } from "./Lightbox";
import { PhotoPlaceholders } from "./PhotoPlaceholders";

type Props = { photos: Photo[]; slots: string[]; limit?: number };

/**
 * Photo grid with a lightbox.
 *
 * Driven entirely by the `photos` list in src/data/site.ts. While that list is
 * empty the component shows named placeholder slots plus a link to the gym's
 * Google listing, which already carries real photographs — so the section is
 * useful to a visitor today and needs no code change once files are added.
 */
/** Static grid of every photo. Used on /gallery. */
export function PhotoGallery({ photos, slots, limit }: Props) {
  const shown = limit ? photos.slice(0, limit) : photos;
  const [open, setOpen] = useState<number | null>(null);

  if (shown.length === 0) return <PhotoPlaceholders slots={slots} />;

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((photo, i) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full overflow-hidden rounded-xl border border-ink-line bg-ink-raised text-left transition-colors hover:border-gold/50"
            >
              <span className="block aspect-4/3 overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </span>
              <span className="block px-5 py-3.5 text-sm text-muted">{photo.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox photos={shown} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </>
  );
}
