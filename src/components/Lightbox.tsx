"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { Photo } from "@/data/site";

type Props = {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
};

/** Full-size photo viewer. Shared by the gallery grid and the home-page strip. */
export function Lightbox({ photos, index, onClose, onIndexChange }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + photos.length) % photos.length);
    },
    [index, photos.length, onIndexChange],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (index !== null && !el.open) el.showModal();
    if (index === null && el.open) el.close();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const photo = index === null ? null : photos[index];

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="max-h-[92vh] max-w-[92vw] bg-transparent p-0 backdrop:bg-ink/92"
      aria-label="Gym photo viewer"
    >
      {photo && index !== null && (
        <div className="relative">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={1600}
            height={1200}
            sizes="92vw"
            className="max-h-[80vh] w-auto rounded-lg object-contain"
          />
          <p className="mt-3 text-center text-sm text-muted">
            {photo.caption}{" "}
            <span className="text-muted">
              ({index + 1} of {photos.length})
            </span>
          </p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="absolute -top-3 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-ink-raised text-bone"
          >
            ✕
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-xl text-bone"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-xl text-bone"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}
