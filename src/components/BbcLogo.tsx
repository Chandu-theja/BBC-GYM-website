type Props = {
  /** "mark" = flame + BBC tiles only. "lockup" adds the FITNESS CENTRE subline. */
  variant?: "mark" | "lockup";
  className?: string;
  title?: string;
};

/**
 * The BBC Fitness Centre mark, rebuilt as vector from the printed logo card.
 * The supplied source was a photograph (glare, background, fixed resolution),
 * so it is redrawn here to stay crisp at every size and to sit cleanly on the
 * dark surfaces the rest of the site uses.
 */
export function BbcLogo({ variant = "lockup", className, title = "BBC Fitness Centre" }: Props) {
  const h = variant === "lockup" ? 168 : 140;

  return (
    <svg
      viewBox={`0 0 240 ${h}`}
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bbc-flame" x1="120" y1="24" x2="120" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDB913" />
          <stop offset="0.55" stopColor="#F58220" />
          <stop offset="1" stopColor="#E1251B" />
        </linearGradient>
      </defs>

      {/* Triangle housing the flame */}
      <path d="M120 8 L166 80 H74 Z" fill="#E1251B" />
      <path
        d="M120 26c9 12 15 19 15 28 0 9-7 16-15 16s-15-7-15-16c0-6 3-11 6-15 1 6 4 9 6 10-1-8 0-16 3-23Z"
        fill="url(#bbc-flame)"
      />
      <path
        d="M120 42c5 7 7 11 7 15 0 5-3 8-7 8s-7-3-7-8c0-4 2-8 7-15Z"
        fill="#FFD100"
        opacity="0.9"
      />

      {/* Dumbbells flanking the wordmark, as on the printed card */}
      {[
        { x: 6, flip: false },
        { x: 202, flip: true },
      ].map(({ x, flip }) => (
        <g key={x} transform={`translate(${x} 92)${flip ? " scale(-1 1) translate(-32 0)" : ""}`} fill="currentColor">
          <rect x="0" y="6" width="6" height="28" rx="2" />
          <rect x="9" y="0" width="9" height="40" rx="2.5" />
          <rect x="21" y="13" width="11" height="14" rx="2" />
        </g>
      ))}

      {/* B B C tiles — green, steel, yellow, matching the printed lockup */}
      <g>
        <rect x="46" y="92" width="42" height="40" rx="3" fill="#00A050" />
        <rect x="92" y="92" width="42" height="40" rx="3" fill="#F2F2F0" />
        <rect x="138" y="92" width="42" height="40" rx="3" fill="#FFD100" />
        <g
          fontFamily="var(--font-display), Arial Narrow, sans-serif"
          fontSize="34"
          textAnchor="middle"
          dominantBaseline="central"
        >
          <text x="67" y="113.5" fill="#F2F2F0">B</text>
          <text x="113" y="113.5" fill="#0B0B0C">B</text>
          <text x="159" y="113.5" fill="#0B0B0C">C</text>
        </g>
      </g>

      {variant === "lockup" && (
        <text
          x="120"
          y="152"
          textAnchor="middle"
          fill="currentColor"
          fontSize="14"
          letterSpacing="5.5"
          fontFamily="var(--font-sans), system-ui, sans-serif"
          opacity="0.75"
        >
          FITNESS CENTRE
        </text>
      )}
    </svg>
  );
}
