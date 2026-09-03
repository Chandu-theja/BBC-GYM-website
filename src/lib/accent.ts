import type { Accent } from "@/data/site";

/**
 * Accent colours are mapped explicitly rather than interpolated, because
 * Tailwind only emits classes it can see as complete strings at build time.
 *
 * `bar` is the colour stripe on a card, `text` the label, `glow` a low-opacity
 * wash used on hover. These mirror the painted colours on the gym's signage.
 */
export const accentClass: Record<Accent, { bar: string; text: string; glow: string; dot: string }> = {
  red: { bar: "bg-flame-red", text: "text-flame-red", glow: "group-hover:shadow-flame-red/20", dot: "bg-flame-red" },
  orange: { bar: "bg-flame-orange", text: "text-flame-orange", glow: "group-hover:shadow-flame-orange/20", dot: "bg-flame-orange" },
  yellow: { bar: "bg-signal-yellow", text: "text-signal-yellow", glow: "group-hover:shadow-signal-yellow/20", dot: "bg-signal-yellow" },
  green: { bar: "bg-gym-green", text: "text-gym-green", glow: "group-hover:shadow-gym-green/20", dot: "bg-gym-green" },
  blue: { bar: "bg-crossfit-blue", text: "text-crossfit-blue", glow: "group-hover:shadow-crossfit-blue/20", dot: "bg-crossfit-blue" },
  steel: { bar: "bg-steel", text: "text-steel", glow: "group-hover:shadow-steel/20", dot: "bg-steel" },
};
