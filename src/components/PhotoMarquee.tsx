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

  // Below three photos a scroller would just repeat the same image across the
  // viewport, which reads as broken rather than as a gallery. Show what exists
  // in a grid beside the shots still missing, and start scrolling only once
  // there is genuinely something to scroll through.
  if (photos.length < 3) {
    return (
      <div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
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
          ))}
          {slots.slice(0, Math.max(0, 6 - photos.length)).map((label) => (
            <div
              key={label}
              className="flex aspect-4/3 flex-col items-center justify-center rounded-xl border border-dashed border-ink-line bg-ink-raised/40 px-5 text-center"
            >
              <svg viewBox="0 0 24 24" className="h-8 w-8 fill-muted/30" aria-hidden="true">
                <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v8.6l3.6-3.6 3 3L15 10l4 4V7H5Zm3.5 1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
              <p className="mt-3 text-sm font-medium text-muted">{label}</p>
              <p className="mt-1 text-xs text-muted">Photo coming soon</p>
            </div>
          ))}
        </div>
        <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
      </div>
    );
  }

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
                className="group/tile block w-full overflow-hidden rounded-xl border border-ink-line bg-ink-raised text-left transition-colors hover:border-gold/50"
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
                <span className="block px-4 py-3 text-xs text-muted">{photo.caption}</span>
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
          className="rounded-full border border-ink-line px-4 py-2 text-xs font-medium text-muted transition-colors hover:border-muted/50 hover:text-bone"
        >
          {paused ? "▶ Resume scrolling" : "❙❙ Pause scrolling"}
        </button>
      </div>

      <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </div>
  );
}
