import { neon } from "@neondatabase/serverless";

/**
 * Lazily created so the app still builds and renders when DATABASE_URL is not
 * set — the enquiry form degrades to its WhatsApp fallback instead of crashing
 * the whole route.
 */
let client: ReturnType<typeof neon> | null = null;

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!client) client = neon(url);
  return client;
}

export type Enquiry = {
  id: number;
  name: string;
  phone: string;
  program: string | null;
  goal: string | null;
  message: string | null;
  created_at: string;
};
