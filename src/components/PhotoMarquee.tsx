"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/data/site";
import { Lightbox } from "./Lightbox";
import { PhotoPlaceholders } from "./PhotoPlaceholders";

type Props = { photos: Photo[]; slots: string[] };

/**
 * Continuously scrolling photo strip.
 *
 * The track holds the photo list twice and translates by exactly -50%, so the
 * second copy is under the cursor at the moment the animation restarts and the
 * loop has no visible seam. Short lists are repeated first so the strip is never
 * wider than its own content.
 *
 * WCAG 2.2.2 requires that motion lasting more than five seconds can be stopped,
 * hence the pause control. It also halts on hover and on keyboard focus, so
 * nobody has to chase a moving target to click a photo.
 */
export function PhotoMarquee({ photos, slots }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  if (photos.length === 0) return <PhotoPlaceholders slots={slots} />;

  // Repeat until there are enough tiles to cover a wide viewport, then double
  // that for the seamless loop.
  const minTiles = 6;
  const base: { photo: Photo; index: number }[] = [];
  while (base.length < minTiles) {
    photos.forEach((photo, index) => base.push({ photo, index }));
    if (photos.length === 0) break;
  }
  const track = [...base, ...base];

  // Roughly six seconds per distinct photo, so longer sets do not crawl.
  const duration = Math.max(20, base.length * 6);

  return (
    <div>
      <div
        className="group relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Edge fades, so tiles enter and leave rather than being chopped off. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ink to-transparent sm:w-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ink to-transparent sm:w-20"
        />

        <ul
          className="flex w-max gap-4 motion-safe:animate-[marquee_linear_infinite]"
          style={{ animationDuration: `${duration}s`, animationPlayState: paused ? "paused" : "running" }}
        >
          {track.map(({ photo, index }, i) => (
            <li key={`${photo.src}-${i}`} className="w-[15rem] shrink-0 sm:w-[19rem]">
              <button
                type="button"
                onClick={() => setOpen(index)}
                // The duplicated half is decorative; only the first copy is reachable.
                tabIndex={i < base.length ? 0 : -1}
                aria-hidden={i < base.length ? undefined : true}
                className="group/tile block w-full overflow-hidden rounded-xl border border-ink-line bg-ink-raised text-left transition-colors hover:border-brand-gold/50"
              >
                <span className="block aspect-4/3 overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={640}
                    height={480}
                    sizes="(max-width: 640px) 240px, 304px"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/tile:scale-[1.05]"
                  />
                </span>
                <span className="block px-4 py-3 text-xs text-smoke">{photo.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
          className="rounded-full border border-ink-line px-4 py-2 text-xs font-medium text-smoke transition-colors hover:border-smoke/50 hover:text-steel"
        >
          {paused ? "▶ Resume scrolling" : "❙❙ Pause scrolling"}
        </button>
      </div>

      <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </div>
  );
}
