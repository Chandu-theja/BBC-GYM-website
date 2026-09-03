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

`public/photos/01-main-weights-floor.jpg` was taken from the gym's own Google Maps listing at the
owner's direction. **It shows identifiable members' faces** — fine while it is the gym's own
publicly listed photo, but replace it if anyone in it objects.

**To add photos: drop files in `public/photos/` and redeploy.** There is no code to edit —
`src/lib/photos.ts` scans that folder at build time. Filename order controls sequence, and the
caption is derived from the filename (`01-main-weights-floor.jpg` -> "Main weights floor").
`public/photos/README.md` has the full convention.

- `src/components/PhotoMarquee.tsx` — the auto-scrolling strip in the home page's "Have a look
  around" section. The track holds the list twice and translates exactly `-50%`, so the loop has
  no visible seam. It pauses on hover, on keyboard focus, and via a visible pause button
  (WCAG 2.2.2 requires motion over five seconds be stoppable), and does not animate at all under
  `prefers-reduced-motion`.
- `src/components/PhotoGallery.tsx` — the static grid on `/gallery`.
- `src/components/Lightbox.tsx` — shared viewer: arrow keys, Escape, click-outside, wrapping.

While the folder is empty both fall back to `PhotoPlaceholders`, which names the shots that are
missing and links to the gym's Google listing.

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
| `DATABASE_URL` | no | Neon Postgres. Provisioned via `vercel integration add neon`; `vercel env pull` writes it locally. Without it the WhatsApp handoff still works and `/api/enquiry` reports `{"stored": false, "reason": "no-database"}`. |
| `ADMIN_PASSWORD` | for `/admin/enquiries` | Gates the lead inbox. |

The `enquiries` table and its index already exist. `schema.sql` is idempotent if you ever need to
recreate them on a fresh database.

## Production

- **Security headers** are set in `next.config.ts` for every route: CSP (with `frame-src` scoped to
  google.com for the map and `form-action` allowing the WhatsApp handoff), HSTS, `nosniff`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. `x-powered-by` is off. If you add a
  third-party script or embed, it will be blocked until you add its origin to the CSP.
- `/admin` and `/api` send `no-store`; `/brand` assets are `immutable`.
- `error.tsx` and `global-error.tsx` both surface the phone number — a broken page on a gym site
  should still convert.
- **Duplicate guard:** the same phone number within 60 seconds is rejected in Postgres. The
  in-memory IP limiter is per-instance and cannot catch a double-tapped submit landing on another
  instance; shared state can.
- Accessibility: every page has one `h1`, correct heading order, labelled inputs, alt text on all
  images, no empty links or buttons, no duplicate ids.

**Deploys are CLI-only** (`npx vercel --prod`). `vercel git connect` fails because the GitHub app
is not authorised for this repo on the `dharsangroups` team — authorise it in the Vercel dashboard
and pushes to `main` will deploy automatically.

## Enquiry flow

The form hands off to WhatsApp with every field already filled in, so the visitor never types
their name and number twice.

`src/components/EnquiryForm.tsx` keeps the fields in state and rebuilds a `wa.me` link on every
keystroke. **The submit control is a real `<a href="https://wa.me/...">`, not a button that opens
a window after awaiting something** — a popup opened after an `await` has lost its user-gesture
context and gets blocked, whereas a plain link click never is. Enter-to-submit forwards to that
same link so it stays inside the gesture.

Alongside the click, the lead is POSTed to `src/app/api/enquiry/route.ts` fire-and-forget
(`keepalive: true`), so the gym keeps a record even if the visitor never presses send in WhatsApp.
That route validates with the shared schema in `src/lib/enquiry.ts`, rate-limits per IP, and
**always returns 200** — recording a lead must never be able to delay or break the handoff. Stored
leads are read at **`/admin/enquiries`**; with no `DATABASE_URL` it simply reports
`{"stored": false, "reason": "no-database"}` and the WhatsApp handoff is unaffected.

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
- [x] **Opening hours.** `05:00–22:00` daily, corroborated against the Google Maps listing
      ("Thursday, 5 am to 10 pm") as well as Justdial. Published in the structured data.
- [ ] **Photography.** The site currently ships **zero photographs** — the signage screenshots
      were removed (they were low-resolution Google Street View captures, one carrying a visible
      "© 2026 Google" watermark, so they were never safe to publish). The vector `SignagePanel`
      stands in for the exterior. Real interior photographs — weights floor, cardio, CrossFit rig,
      ladies' area, reception, a class in session — should replace the six placeholder tiles on
      `/gallery`.
