import { site, fullAddress } from "@/data/site";

export function MapEmbed({ className = "" }: { className?: string }) {
  // Coordinate-based embed — no API key required, and it stays correct even if
  // the listing's place name changes.
  const src = `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&hl=en&z=16&output=embed`;

  return (
    <div className={`overflow-hidden rounded-xl border border-ink-line ${className}`}>
      <iframe
        src={src}
        title={`Map showing ${site.name} at ${fullAddress}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[320px] w-full border-0 grayscale-[0.35] contrast-[1.1] sm:h-[400px]"
        allowFullScreen
      />
    </div>
  );
}
