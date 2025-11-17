// Basic in-memory rate limiter (per IP)
// Good enough for small websites

const RATE_LIMIT_WINDOW_MS = 30 * 1000; // 30s per request max
const MAX_REQUESTS = 1;

const ipStore = new Map<string, { count: number; timestamp: number }>();

export function rateLimit(ip: string) {
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry) {
    ipStore.set(ip, { count: 1, timestamp: now });
    return { success: true };
  }

  // Reset window
  if (now - entry.timestamp > RATE_LIMIT_WINDOW_MS) {
    ipStore.set(ip, { count: 1, timestamp: now });
    return { success: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { success: false };
  }

  entry.count++;
  ipStore.set(ip, entry);
  return { success: true };
}
