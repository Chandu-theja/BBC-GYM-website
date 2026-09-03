/**
 * Single source of truth for every business fact on the site.
 *
 * Sourced facts carry a comment naming where they came from. Anything marked
 * TODO(owner) is a placeholder awaiting confirmation and is rendered with a
 * visible "to be confirmed" treatment so nothing unverified reads as fact.
 */

export const site = {
  name: "BBC Bouncers Fitness Gym",
  shortName: "BBC Bouncers",
  legalName: "BBC Fitness Centre",
  tagline: "Tirupati's strongest training floor.",
  description:
    "Ladies & gents gym in Akkarampalli, Tirupati — strength training, CrossFit, Zumba, aerobics and personal coaching on Karakambadi Road. Rated 4.9 by 166 members.",

  // From the logo card in the owner-supplied photo.
  phone: "+919494776969",
  phoneDisplay: "94947 76969",

  // From the Google Maps listing / Justdial.
  address: {
    line1: "Opposite Bharat Petroleum",
    line2: "Karakambadi Road, Akkarampalli",
    city: "Tirupati",
    state: "Andhra Pradesh",
    postalCode: "517507",
    country: "IN",
  },
  geo: { lat: 13.6488083, lng: 79.4483575 },
  mapsUrl: "https://maps.app.goo.gl/2su9bsNATaEVxqgPA",
  placeId: "0x3a4d4b0e70d8fed3:0xfd19ef4fb91dd4bf",

  rating: { value: 4.9, count: 166 },

  // TODO(owner): confirm. Sourced from Justdial, not from the owner directly.
  hours: { opens: "05:00", closes: "22:00", note: "Open all seven days" },

  url: "https://bbc-gym-website.vercel.app",
} as const;

export const fullAddress = [
  site.address.line1,
  site.address.line2,
  `${site.address.city} ${site.address.postalCode}`,
  site.address.state,
].join(", ");

export function whatsappLink(message: string) {
  return `https://wa.me/${site.phone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

/**
 * Program accent keys map to the colours used on the gym's own signage wall,
 * where each discipline is painted in its own colour. Keeping that mapping
 * intact is what makes the palette read as the brand rather than as decoration.
 */
export type Accent = "red" | "orange" | "yellow" | "green" | "blue" | "steel";

export type Program = {
  slug: string;
  name: string;
  accent: Accent;
  summary: string;
  detail: string;
  points: string[];
};

export const programs: Program[] = [
  {
    slug: "gym-strength",
    name: "Gym & Strength",
    accent: "red",
    summary: "Free weights, machines and a coached progression plan.",
    detail:
      "The main floor: barbells, dumbbells to heavy, plate-loaded machines and dedicated squat and bench stations. Every member gets a starting assessment and a written progression rather than a wander around the equipment.",
    points: ["Free weights & racks", "Plate-loaded machines", "Written progression plan", "Form coaching on the floor"],
  },
  {
    slug: "ladies-gents",
    name: "Ladies & Gents",
    accent: "yellow",
    summary: "Separate batch timings so everyone trains comfortably.",
    detail:
      "Dedicated batch timings for women alongside general floor hours, with women coaches present during ladies' batches. Ask at the desk for the current batch schedule.",
    points: ["Dedicated ladies' batches", "Women coaches on shift", "Private changing area", "Family memberships"],
  },
  {
    slug: "crossfit",
    name: "CrossFit",
    accent: "blue",
    summary: "Conditioning circuits built around barbell and bodyweight work.",
    detail:
      "Coached group conditioning — Olympic-style lifting, kettlebells, rowing, box work and bodyweight metcons, scaled to whatever you walk in with.",
    points: ["Coached group sessions", "Olympic lift technique", "Scaled for all levels", "Kettlebell & rig work"],
  },
  {
    slug: "aerobics",
    name: "Aerobics",
    accent: "green",
    summary: "High-energy floor classes for stamina and fat loss.",
    detail:
      "Low-impact and high-intensity aerobic classes across the week, built for cardiovascular endurance and steady fat loss without hammering your joints.",
    points: ["Low & high impact options", "Endurance focused", "Group energy", "Beginner friendly"],
  },
  {
    slug: "zumba-dance",
    name: "Zumba Dance",
    accent: "orange",
    summary: "Dance fitness that doesn't feel like a workout.",
    detail:
      "Latin and Bollywood-mixed dance fitness. The most popular entry point for members who want to get fit without setting foot near a barbell on day one.",
    points: ["Latin & Bollywood mixes", "No dance experience needed", "Evening batches", "Serious calorie burn"],
  },
  {
    slug: "cardio",
    name: "Cardio Floor",
    accent: "steel",
    summary: "Treadmills, cycles and cross-trainers with open access.",
    detail:
      "Open-access cardio equipment available through all operating hours — treadmills, upright and recumbent cycles, cross-trainers and rowers.",
    points: ["Treadmills", "Cycles & cross-trainers", "Rowing", "Open through all hours"],
  },
  {
    slug: "personal-training",
    name: "Personal Training",
    accent: "red",
    summary: "One-to-one coaching with a senior coach.",
    detail:
      "One-to-one blocks with a senior coach covering programming, technique correction and nutrition guidance, built around your specific goal and schedule.",
    points: ["One-to-one sessions", "Senior coach assigned", "Nutrition guidance", "Goal-based programming"],
  },
];

export type Coach = { name: string; role: string; focus: string; tier: "senior" | "junior" };

export const coaches: Coach[] = [
  { name: "Dileep", role: "Senior Coach", focus: "Strength & powerlifting", tier: "senior" },
  { name: "Sekhar", role: "Senior Coach", focus: "CrossFit & conditioning", tier: "senior" },
  { name: "Syed", role: "Senior Coach", focus: "Bodybuilding & transformation", tier: "senior" },
];

// TODO(owner): supply junior coach names, roles and focus areas.
export const juniorCoachSlots = 3;

export type Plan = {
  name: string;
  months: number;
  price: number | null; // null renders as "Ask at the desk" rather than a fake number
  featured?: boolean;
  perks: string[];
};

// TODO(owner): confirm all amounts before launch. Rendered with a visible
// "indicative" flag while `price` values remain unconfirmed.
export const PRICES_CONFIRMED = false;

export const plans: Plan[] = [
  { name: "Monthly", months: 1, price: null, perks: ["Full gym floor access", "All cardio equipment", "Joining assessment"] },
  { name: "Quarterly", months: 3, price: null, perks: ["Everything in Monthly", "All group classes", "Progress review each month"] },
  {
    name: "Half-Yearly",
    months: 6,
    price: null,
    featured: true,
    perks: ["Everything in Quarterly", "Diet & nutrition plan", "2 personal training sessions", "Body composition tracking"],
  },
  { name: "Annual", months: 12, price: null, perks: ["Everything in Half-Yearly", "Best value per month", "Priority batch booking", "Guest passes"] },
];

export type Photo = { src: string; alt: string; caption: string };

/**
 * Photos are not listed here — they are read from `public/photos/` at build time
 * by `getPhotos()` in src/lib/photos.ts. Drop a file in that folder and it
 * appears; there is nothing to edit.
 */

/** Slots shown while `photos` is empty, so the page states what is missing. */
export const photoSlots = [
  "Cardio section",
  "CrossFit rig",
  "Ladies' batch area",
  "Reception",
  "Group class in session",
];
