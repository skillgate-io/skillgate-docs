// In-memory sliding-window rate limiter for the Docs Assistant API.
// Keyed by client IP. Resets automatically after WINDOW_MS.
// For multi-instance deployments, replace this with Redis.
import { createHash } from 'node:crypto';

interface WindowState {
  count: number;
  windowStart: number;
}

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 10;  // 10 per minute (public docs tier)

// Module-level store — persists across requests within a process
const store = new Map<string, WindowState>();

export interface RateLimitResult {
  allowed: boolean;
  /** Milliseconds until the window resets (only set when blocked). */
  retryAfterMs?: number;
  remaining: number;
}

/**
 * Check and increment rate limit for a client identifier (IP address).
 * Call once per inbound request — side-effectful.
 */
export function checkRateLimit(clientId: string): RateLimitResult {
  const now = Date.now();
  const state = store.get(clientId);

  if (!state || now - state.windowStart >= WINDOW_MS) {
    // Fresh window
    store.set(clientId, { count: 1, windowStart: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (state.count >= MAX_REQUESTS) {
    const retryAfterMs = WINDOW_MS - (now - state.windowStart);
    return { allowed: false, retryAfterMs, remaining: 0 };
  }

  state.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - state.count };
}

/**
 * Resolve a stable client identifier from trusted edge headers.
 * We intentionally ignore raw x-forwarded-for/x-real-ip to prevent spoof-based bypass.
 */
export function resolveClientId(req: Request): string {
  const trustedIp =
    normalizeIp(req.headers.get('x-nf-client-connection-ip')) ??
    normalizeIp(req.headers.get('cf-connecting-ip')) ??
    normalizeIp(req.headers.get('x-vercel-ip')) ??
    normalizeIp(req.headers.get('fly-client-ip'));

  if (trustedIp) {
    return `ip:${trustedIp}`;
  }

  const ua = req.headers.get('user-agent') ?? '';
  const lang = req.headers.get('accept-language') ?? '';
  const host = req.headers.get('host') ?? '';
  const digest = createHash('sha256').update(`${ua}|${lang}|${host}`).digest('hex').slice(0, 32);
  return `fp:${digest}`;
}

/** Peek at remaining count without incrementing (for tests and diagnostics). */
export function peekRateLimit(clientId: string): RateLimitResult {
  const now = Date.now();
  const state = store.get(clientId);

  if (!state || now - state.windowStart >= WINDOW_MS) {
    return { allowed: true, remaining: MAX_REQUESTS };
  }
  if (state.count >= MAX_REQUESTS) {
    const retryAfterMs = WINDOW_MS - (now - state.windowStart);
    return { allowed: false, retryAfterMs, remaining: 0 };
  }
  return { allowed: true, remaining: MAX_REQUESTS - state.count };
}

/** Reset a client's window — useful in tests. */
export function resetRateLimit(clientId: string): void {
  store.delete(clientId);
}

function normalizeIp(raw: string | null): string | null {
  if (!raw) return null;
  const candidate = raw.split(',')[0]?.trim();
  if (!candidate) return null;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(candidate)) return candidate;
  if (/^[0-9a-fA-F:]+$/.test(candidate)) return candidate.toLowerCase();
  return null;
}
