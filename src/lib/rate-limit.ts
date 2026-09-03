/**
 * Best-effort in-memory limiter. Serverless instances are not shared, so this
 * blunts casual repeat submissions rather than guaranteeing a global limit —
 * which, combined with the honeypot, is the right amount of friction for a
 * local gym's enquiry form.
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
