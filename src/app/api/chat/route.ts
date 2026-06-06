import { streamText, type CoreMessage } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { buildSystemPrompt } from '@/lib/chatKnowledge';
import { rateLimit, clientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';
export const maxDuration = 30;

// Owner can override the model via env for a public bot (cost vs. quality).
// Default is the most capable model per Anthropic guidance.
const MODEL = process.env.CHAT_MODEL ?? 'claude-opus-4-8';
const MAX_OUTPUT_TOKENS = 700;
const MAX_MESSAGES = 24;

type IncomingMessage = { role: 'user' | 'assistant'; content: string };

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  // No key configured → 503 so the client shows its "leave your email" fallback
  // and a lead is never lost.
  if (!apiKey) {
    return new Response('chat_unavailable', { status: 503 });
  }

  const { success } = await rateLimit(`chat:${clientIp(req)}`);
  if (!success) {
    return new Response('rate_limited', { status: 429 });
  }

  let body: { locale?: string; messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response('invalid_json', { status: 400 });
  }

  const locale = typeof body.locale === 'string' ? body.locale : 'en';
  const raw = Array.isArray(body.messages) ? body.messages : [];

  // Anthropic requires the first message to be `user` — drop the seeded
  // assistant greeting (and any leading assistant turns). Trim history length.
  const firstUser = raw.findIndex((m) => m.role === 'user');
  const trimmed = firstUser === -1 ? [] : raw.slice(firstUser).slice(-MAX_MESSAGES);

  if (trimmed.length === 0) {
    return new Response('empty', { status: 400 });
  }

  const messages: CoreMessage[] = trimmed
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  const anthropic = createAnthropic({ apiKey });

  try {
    const result = streamText({
      model: anthropic(MODEL),
      system: buildSystemPrompt(locale),
      messages,
      maxTokens: MAX_OUTPUT_TOKENS,
      // Note: Opus 4.8 rejects sampling params (temperature/top_p) — omitted.
    });
    return result.toTextStreamResponse();
  } catch (err) {
    console.error('[chat:stream-failed]', err);
    return new Response('chat_error', { status: 502 });
  }
}
