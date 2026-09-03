import { readdirSync } from "node:fs";
import path from "node:path";
import type { Photo } from "@/data/site";

const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Reads the gym photos straight out of `public/photos/` at build time.
 *
 * Deliberately a directory scan rather than a hand-maintained array: adding a
 * photo should be dropping a file in a folder, not editing TypeScript. Files are
 * shown in filename order, so a numeric prefix controls the sequence.
 *
 *   01-main-weights-floor.jpg  ->  "Main weights floor"
 *
 * The caption comes from the filename: the numeric prefix is dropped, dashes and
 * underscores become spaces, and the first letter is capitalised.
 */
export function getPhotos(): Photo[] {
  let files: string[];
  try {
    files = readdirSync(path.join(process.cwd(), "public", "photos"));
  } catch {
    return []; // Folder absent — the empty state handles it.
  }

  return files
    .filter((f) => IMAGE.test(f))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((file) => {
      const caption = captionFor(file);
      return {
        src: `/photos/${file}`,
        alt: `${caption} at BBC Bouncers Fitness Gym, Tirupati`,
        caption,
      };
    });
}

/** Words a filename cannot capitalise on its own. */
const CASED: Record<string, string> = {
  crossfit: "CrossFit",
  bbc: "BBC",
  hiit: "HIIT",
  ladies: "Ladies'",
  gents: "Gents",
  zumba: "Zumba",
};

function captionFor(file: string) {
  const base = file
    .replace(IMAGE, "")
    .replace(/^\d+[-_.\s]*/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  if (!base) return "Inside the gym";

  const words = base.split(/\s+/).map((w) => CASED[w.toLowerCase()] ?? w);
  const first = words[0];
  words[0] = CASED[first.toLowerCase()] ? first : first.charAt(0).toUpperCase() + first.slice(1);
  return words.join(" ");
}
