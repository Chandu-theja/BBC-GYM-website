import Image from "next/image";

type Props = {
  /** glyph — the flame triangle alone. lockup — the full BBC Fitness Centre badge. */
  variant?: "glyph" | "lockup";
  className?: string;
  priority?: boolean;
};

const ASSETS = {
  glyph: { src: "/brand/bbc-glyph.png", width: 512, height: 512 },
  lockup: { src: "/brand/bbc-lockup.png", width: 1200, height: 727 },
} as const;

/**
 * The owner-supplied BBC Fitness Centre logo.
 *
 * The original file had its slate background baked in, which would have shown
 * as a grey block against the site's near-black surfaces. It was keyed out and
 * trimmed to the artwork's own bounds, so both assets are transparent and sit
 * directly on any background.
 */
export function Logo({ variant = "lockup", className, priority = false }: Props) {
  const a = ASSETS[variant];
  return (
    <Image
      src={a.src}
      width={a.width}
      height={a.height}
      priority={priority}
      alt="BBC Fitness Centre"
      className={className}
      sizes={variant === "glyph" ? "64px" : "(max-width: 640px) 220px, 300px"}
    />
  );
}
