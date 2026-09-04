import Link from "next/link";
import { Logo } from "./Logo";

/**
 * Full logo lockup across the top of every page.
 *
 * It sits above the sticky header rather than inside it: the lockup needs room
 * to be legible, and a sticky bar that tall would eat the viewport on scroll.
 * This scrolls away and the compact header takes over.
 */
export function BrandBanner() {
  return (
    <div className="border-b border-ink-line bg-ink-raised/30">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-5 py-7 sm:py-9">
        <Link href="/" aria-label="BBC Bouncers Fitness Gym — home" className="block">
          <Logo variant="lockup" priority className="h-auto w-56 sm:w-72" />
        </Link>
      </div>
    </div>
  );
}
