import { NextResponse } from 'next/server';
import { apiContactSchema } from '@/lib/schemas';
import { sendLeadNotification, sendAutoresponder, type LeadEmail } from '@/lib/email';
import { saveLead } from '@/lib/db';
import { rateLimit, clientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  // Throttle to prevent spam/abuse.
  const { success } = await rateLimit(`contact:${clientIp(req)}`);
  if (!success) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = apiContactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  }
  const data = parsed.data;

  // Honeypot tripped on the full form → pretend success, drop silently.
  if (data.intent === 'lead' && data.website) {
    return NextResponse.json({ ok: true });
  }

  const lead: LeadEmail =
    data.intent === 'lead'
      ? {
          name: data.name,
          email: data.email,
          company: data.company || undefined,
          service: data.service || undefined,
          budget: data.budget || undefined,
          packageName: data.package || undefined,
          language: data.language || undefined,
          message: data.message,
          source: 'contact form',
        }
      : { email: data.email, source: data.intent === 'newsletter' ? 'newsletter' : 'chatbot' };

  // Persist to the DB backup first so the lead survives even if email fails.
  const stored = await saveLead(lead);

  // Then notify the team + (for full leads) send an autoresponder. Email failures
  // must not lose the lead — we log and still return ok so the UI can confirm.
  try {
    const notified = await sendLeadNotification(lead);
    if (data.intent === 'lead') {
      await sendAutoresponder(lead).catch(() => undefined);
    }
    if (!notified && !stored) {
      // Neither email nor DB configured (e.g. local dev) — log so it's recoverable.
      console.info('[lead:not-persisted]', JSON.stringify(lead));
    }
  } catch (err) {
    console.error('[lead:send-failed]', err, JSON.stringify(lead));
    // Still acknowledge — the DB copy (if stored) and logs preserve the lead.
  }

  return NextResponse.json({ ok: true });
}
