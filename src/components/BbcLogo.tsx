type Variant = "glyph" | "mark" | "lockup";

type Props = {
  /**
   * glyph  — flame in the triangle only. For favicons and anything under ~40px.
   * mark   — flame + dumbbells + BBC tiles.
   * lockup — mark plus the FITNESS CENTRE subline.
   */
  variant?: Variant;
  className?: string;
  title?: string;
};

/*
 * The BBC Fitness Centre mark, redrawn as vector from the printed logo card.
 *
 * The letterforms are real paths, not <text>. An earlier version set them in the
 * display webfont, which meant the mark silently changed shape whenever that font
 * failed to load — unacceptable for a logo. Everything here renders identically
 * with no fonts available at all.
 */

// Blocky B, native box 22.5 × 28. Bowls are cut with evenodd rather than
// overpainting, so the mark stays correct on any background colour.
const B_PATH =
  "M0 0H12.5C18.3 0 21.6 2.9 21.6 7.4C21.6 10.3 20.2 12.3 17.7 13.2C20.8 14 22.5 16.3 22.5 19.9C22.5 24.8 19 28 13.2 28H0Z" +
  "M6.4 5H12C14.5 5 15.7 6 15.7 7.9C15.7 9.8 14.5 10.8 12 10.8H6.4Z" +
  "M6.4 17.3H12.7C15.3 17.3 16.6 18.4 16.6 20.3C16.6 22.3 15.3 23.3 12.7 23.3H6.4Z";

// C built as a true annulus with a 70° aperture, native box 28 × 28.
const C_PATH =
  "M25.47 5.97A14 14 0 1 0 25.47 22.03L21.04 18.94A8.6 8.6 0 1 1 21.04 9.06Z";

const FLAME_OUTER =
  "M14 1C15.5 9 24 13.5 24 23.5C24 31 19.5 36 14 36C8.5 36 4 31 4 23.5C4 18 7 14 10 11C10.2 16 12 18.5 13.5 19.5C12 13 12 6.5 14 1Z";
const FLAME_CORE =
  "M14 15C15 19.5 19 22 19 26.5C19 30.5 16.7 33 14 33C11.3 33 9 30.5 9 26.5C9 23 11 20 14 15Z";

/** Plate · plate · handle, drawn once and mirrored for the right side. */
function Dumbbell() {
  return (
    <g fill="currentColor">
      <rect x="0" y="11" width="7" height="20" rx="2.5" />
      <rect x="10" y="3" width="12" height="36" rx="4" />
      <rect x="25" y="16" width="15" height="10" rx="3" />
    </g>
  );
}

function FlameTriangle() {
  return (
    <>
      {/* Corners are rounded by stroking the triangle in its own fill colour. */}
      <path
        d="M130 14L172 82H88Z"
        fill="#E1251B"
        stroke="#E1251B"
        strokeWidth="9"
        strokeLinejoin="round"
      />
      <g transform="translate(116.7 32) scale(0.95)">
        <path d={FLAME_OUTER} fill="url(#bbc-flame)" />
        <path d={FLAME_CORE} fill="#FFD100" />
      </g>
    </>
  );
}

export function BbcLogo({ variant = "lockup", className, title = "BBC Fitness Centre" }: Props) {
  const height = variant === "lockup" ? 190 : variant === "mark" ? 152 : 100;
  const width = variant === "glyph" ? 100 : 260;

  const defs = (
    <defs>
      <linearGradient id="bbc-flame" x1="14" y1="1" x2="14" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDB913" />
        <stop offset="0.5" stopColor="#F58220" />
        <stop offset="1" stopColor="#E1251B" />
      </linearGradient>
    </defs>
  );

  if (variant === "glyph") {
    return (
      <svg viewBox="0 0 100 100" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
        {defs}
        <g transform="translate(-80 -4) scale(1.05)">
          <FlameTriangle />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {defs}
      <FlameTriangle />

      <g transform="translate(9 98)">
        <Dumbbell />
      </g>
      <g transform="translate(251 98) scale(-1 1)">
        <Dumbbell />
      </g>

      {/* Tiles: green / steel / yellow, exactly as on the printed card. */}
      <rect x="59" y="98" width="44" height="42" rx="4" fill="#00A050" />
      <rect x="108" y="98" width="44" height="42" rx="4" fill="#F2F2F0" />
      <rect x="157" y="98" width="44" height="42" rx="4" fill="#FFD100" />

      <g fillRule="evenodd">
        <path transform="translate(70.55 106) scale(0.929)" d={B_PATH} fill="#F2F2F0" />
        <path transform="translate(119.55 106) scale(0.929)" d={B_PATH} fill="#0B0B0C" />
      </g>
      <path transform="translate(166 106) scale(0.929)" d={C_PATH} fill="#0B0B0C" />

      {variant === "lockup" && (
        <text
          x="130"
          y="170"
          textAnchor="middle"
          fill="currentColor"
          fontSize="15"
          letterSpacing="6"
          fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
          opacity="0.72"
        >
          FITNESS CENTRE
        </text>
      )}
    </svg>
  );
}
