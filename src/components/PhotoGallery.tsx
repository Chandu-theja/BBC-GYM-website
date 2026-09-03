"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/data/site";
import { site } from "@/data/site";

type Props = { photos: Photo[]; slots: string[]; limit?: number };

/**
 * Photo grid with a lightbox.
 *
 * Driven entirely by the `photos` list in src/data/site.ts. While that list is
 * empty the component shows named placeholder slots plus a link to the gym's
 * Google listing, which already carries real photographs — so the section is
 * useful to a visitor today and needs no code change once files are added.
 */
export function PhotoGallery({ photos, slots, limit }: Props) {
  const shown = limit ? photos.slice(0, limit) : photos;
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? null : (i + delta + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open !== null && !el.open) el.showModal();
    if (open === null && el.open) el.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  if (shown.length === 0) {
    return (
      <>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {slots.map((label) => (
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
        <p className="mt-8 text-center text-sm text-smoke">
          Photos of the floor are on our Google listing in the meantime —{" "}
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-gold hover:underline"
          >
            see them there
          </a>
          .
        </p>
      </>
    );
  }

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((photo, i) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full overflow-hidden rounded-xl border border-ink-line bg-ink-raised text-left transition-colors hover:border-brand-gold/50"
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
              <span className="block px-5 py-3.5 text-sm text-smoke">{photo.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(null);
        }}
        className="max-h-[92vh] max-w-[92vw] bg-transparent p-0 backdrop:bg-ink/92"
        aria-label="Gym photo viewer"
      >
        {open !== null && shown[open] && (
          <div className="relative">
            <Image
              src={shown[open].src}
              alt={shown[open].alt}
              width={1600}
              height={1200}
              sizes="92vw"
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <p className="mt-3 text-center text-sm text-smoke">
              {shown[open].caption}{" "}
              <span className="text-smoke/60">
                ({open + 1} of {shown.length})
              </span>
            </p>

            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close photo viewer"
              className="absolute -top-3 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-ink-raised text-steel"
            >
              ✕
            </button>

            {shown.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-xl text-steel"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-xl text-steel"
                >
                  ›
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
