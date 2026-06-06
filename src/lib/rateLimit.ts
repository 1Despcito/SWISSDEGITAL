import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Rate limiter for public API routes (brief §7 guardrails). Uses Upstash Redis
 * when configured (works across serverless instances); otherwise falls back to
 * a best-effort in-memory window so local dev still works.
 */
const hasUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const upstash = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(15, '60 s'),
      prefix: 'sda/ratelimit',
      analytics: false,
    })
  : null;

const memory = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX = 15;

function memoryLimit(key: string): boolean {
  const now = Date.now();
  const hits = (memory.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  memory.set(key, hits);
  return hits.length <= MAX;
}

export async function rateLimit(identifier: string): Promise<{ success: boolean }> {
  if (upstash) {
    const { success } = await upstash.limit(identifier);
    return { success };
  }
  return { success: memoryLimit(identifier) };
}

/** Best-effort client IP from common proxy headers. */
export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]!.trim();
  return req.headers.get('x-real-ip') ?? 'anonymous';
}
