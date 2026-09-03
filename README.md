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

The BBC mark lives in `src/components/BbcLogo.tsx` as vector, redrawn from the printed card so
it stays crisp at any size. There is no bitmap logo asset.

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
- [ ] **Photography.** `public/images/` currently holds low-resolution captures of the signage.
      `signage-street.png` carries a visible Google copyright watermark and is **not used on any
      page** — it is kept as reference only, and must not be published. Real interior photographs
      (weights floor, cardio, CrossFit rig, ladies' area, reception) should replace the
      placeholder tiles on `/gallery`.
