import Image from "next/image";

type Variant = "badge" | "lockup";

type Props = {
  /**
   * badge  — triangle + flame + BBC tiles. The header mark.
   * lockup — the full badge including dumbbells and FITNESS CENTRE. Footer.
   */
  variant?: Variant;
  className?: string;
  /**
   * Load immediately at high priority. Next 16 deprecated `priority`, so this
   * maps to loading/fetchPriority — passing `priority` here silently did nothing.
   */
  eager?: boolean;
};

const ASSETS: Record<Variant, { src: string; width: number; height: number; sizes: string }> = {
  badge: { src: "/brand/bbc-badge.png", width: 512, height: 512, sizes: "72px" },
  lockup: { src: "/brand/bbc-lockup.png", width: 1200, height: 727, sizes: "(max-width: 640px) 200px, 260px" },
};

/**
 * The owner-supplied BBC Fitness Centre logo.
 *
 * The source file had its slate background baked in, which would have shown as a
 * grey block on the site's near-black surfaces; it was keyed out and trimmed to
 * the artwork's own bounds. The crops matter: an earlier header mark cut above
 * the tile band, so it showed a bare gold triangle with no "BBC" in it at all.
 * `badge` keeps the tiles, which is what makes the mark recognisable.
 */
export function Logo({ variant = "lockup", className, eager = false }: Props) {
  const a = ASSETS[variant];
  return (
    <Image
      src={a.src}
      width={a.width}
      height={a.height}
      sizes={a.sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      alt="BBC Fitness Centre"
      className={className}
    />
  );
}
