/**
 * Simple in-memory rate limiter for API routes.
 * Resets on server restart. For production, consider Redis-backed rate limiting.
 */

interface RateLimitEntry {
  count: number
  firstAt: number
}

const store = new Map<string, RateLimitEntry>()

/**
 * Returns true if the given key has exceeded the allowed request count
 * within the time window.
 */
export function isRateLimited(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = store.get(key)

  if (entry && now - entry.firstAt < windowMs) {
    if (entry.count >= maxRequests) return true
    entry.count++
  } else {
    store.set(key, { count: 1, firstAt: now })
  }

  return false
}
