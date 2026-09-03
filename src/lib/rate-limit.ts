/**
 * Best-effort in-memory limiter, per serverless instance.
 *
 * It is deliberately not a global guarantee: instances do not share memory, so
 * a determined flood spread across instances gets through. It is the cheap first
 * line. The honeypot rejects naive bots, and /api/enquiry additionally checks
 * shared state in Postgres for a repeat of the same phone number, which is what
 * actually catches a double-tapped submit button.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;

export function allow(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX) return false;
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return true;
}
