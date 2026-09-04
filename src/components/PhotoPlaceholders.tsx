import { site } from "@/data/site";

/** Shown wherever photos would go while none have been added yet. */
export function PhotoPlaceholders({ slots }: { slots: string[] }) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((label) => (
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
      <p className="mt-8 text-center text-sm text-muted">
        Photos of the floor are on our Google listing in the meantime —{" "}
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-gold hover:underline"
        >
          see them there
        </a>
        .
      </p>
    </>
  );
}
