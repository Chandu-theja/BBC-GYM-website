# BBC Bouncers Fitness Gym — website

Marketing site for **BBC Bouncers Fitness Gym**, Opposite Bharat Petroleum, Karakambadi Road, Akkarampalli, Tirupati 517507.

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Neon Postgres · deployed on Vercel.

---

## Brand

The palette is taken from the gym's own materials — the printed BBC logo card and the painted
signage wall on Karakambadi Road, where each discipline is lettered in its own colour.

| Token | Hex | Where it comes from |
|---|---|---|
| `ink` | `#0B0B0C` | the signage black |
| `steel` | `#F2F2F0` | the "GYM" lettering |
| `flame-red` | `#E1251B` | logo triangle, "BOUNCERS" |
| `flame-orange` | `#F58220` | flame body, "FITNESS" |
| `flame-amber` | `#FDB913` | flame tip |
| `signal-yellow` | `#FFD100` | "LADIES & GENTS", the phone number |
| `gym-green` | `#00A050` | logo "B" tile, "AEROBICS" |
| `crossfit-blue` | `#3B6FB6` | "CROSSFIT" |

**The rule:** ink and steel carry ~90% of every surface. The red→orange→amber flame gradient is
the only accent used for headings and primary buttons. Green, blue and yellow appear *only* as
per-program category accents, which is exactly what the physical signage does. Adding these
colours anywhere else breaks the system.

The logo is the owner-supplied **BBC Fitness Centre** artwork. The original file had its slate
background baked in, which would have shown as a grey block against the site's near-black
surfaces, so it was keyed out (rembg / birefnet-general) and trimmed to the artwork's own bounds.
Two transparent assets are derived from it:

- `public/brand/bbc-lockup.png` — the full badge with dumbbells, used in the footer
- `public/brand/bbc-badge.png` — triangle + flame + **BBC tiles**, used in the header and as the
  favicon (`src/app/icon.png`, `src/app/apple-icon.png`)

**The crop matters.** A first attempt cut the header mark above the tile band, which left a bare
gold triangle carrying no "BBC" at all — at 44px it read as an anonymous pointed shape. The tile
band sits at y 680–957 of the trimmed artwork; any header or favicon crop has to include it.
Favicon options were compared as actual 16/32/48px renders before picking: the flame alone blurs,
the tiles alone lose the flame, the badge survives 32px (the effective size on a retina tab) and
matches the header, so the tab and the site agree.

Both are served through `src/components/Logo.tsx`. The logo's own gold and green are in the
palette as `brand-gold` and `brand-green` so it sits in the page rather than on top of it.

**Heading colours match the entrance banner**, not the logo: BOUNCERS red, FITNESS orange,
GYM white — the same three colours painted on the wall, so the site and the building agree.

`src/components/SignagePanel.tsx` is a typographic recreation of the signage wall on Karakambadi
Road. `variant="full"` reproduces the whole sign; `variant="disciplines"` drops the name so it
can sit under the hero heading without repeating "Bouncers Gym" twice on one screen.

## Photos

`src/components/PhotoGallery.tsx` renders the grid and a keyboard-navigable lightbox (arrow keys,
Escape, click-outside). It reads `photos` from `src/data/site.ts`:

```ts
export const photos: Photo[] = [
  { src: "/photos/weights-floor.jpg", alt: "...", caption: "Main weights floor" },
];
```

**To add photos:** drop the files in `public/photos/` and append entries to that array. Both the
home-page "See the gym" section and `/gallery` switch out of their empty state automatically —
no component changes needed. While the list is empty they show named placeholder slots and link
to the gym's Google listing, which already carries real photographs.

## Business data

Everything factual lives in **`src/data/site.ts`** — address, phone, hours, geo, rating,
programs, coaches, plans. Change it there and it updates every page, the footer, the sitemap
and the structured data at once. Nothing is hardcoded in a component.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + typecheck
```

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | no | Neon Postgres connection string. Without it the enquiry form falls back to a prefilled WhatsApp handoff instead of failing. |
| `ADMIN_PASSWORD` | for `/admin/enquiries` | Gates the lead inbox. |

Run `schema.sql` once against the database to create the `enquiries` table.

## Enquiry flow

`/contact` → server action `submitEnquiry` (`src/app/actions.ts`) → zod validation → honeypot
+ per-IP rate limit → insert into `enquiries`. Leads are read at **`/admin/enquiries`**.

If the database is unreachable *for any reason*, the form does not simply error — it returns a
prefilled WhatsApp link containing the visitor's details, so a lead is never silently dropped.
Submitted values are echoed back into the form on any non-success state, because React 19
resets uncontrolled inputs once a form action resolves.

## SEO

`HealthClub` JSON-LD (`src/components/JsonLd.tsx`) carries the address, geo, opening hours,
phone and the 4.9/166 aggregate rating. Verify changes with Google's Rich Results Test.
`sitemap.xml` and `robots.txt` are generated from `src/data/site.ts`; `/admin` is disallowed.

---

## Open items before launch

These are deliberately visible in the UI rather than filled with invented values.

- [ ] **Pricing.** All plans render "Ask at the desk". Add real amounts to `plans` in
      `src/data/site.ts` and flip `PRICES_CONFIRMED` to `true`.
- [ ] **Junior coaches.** `/coaches` shows three dashed placeholder tiles. Add entries with
      `tier: "junior"` to `coaches`.
- [ ] **Opening hours.** `05:00–22:00` daily is sourced from Justdial, not from the owner.
      Confirm before launch — it is published in the structured data.
- [ ] **Photography.** The site currently ships **zero photographs** — the signage screenshots
      were removed (they were low-resolution Google Street View captures, one carrying a visible
      "© 2026 Google" watermark, so they were never safe to publish). The vector `SignagePanel`
      stands in for the exterior. Real interior photographs — weights floor, cardio, CrossFit rig,
      ladies' area, reception, a class in session — should replace the six placeholder tiles on
      `/gallery`.
