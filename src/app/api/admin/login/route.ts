import { NextResponse } from 'next/server';
import { checkPassword, createToken, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/auth';
import { rateLimit, clientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  // Throttle brute-force attempts.
  const { success } = await rateLimit(`admin-login:${clientIp(req)}`);
  if (!success) return NextResponse.json({ ok: false }, { status: 429 });

  let password = '';
  try {
    const body = await req.json();
    password = typeof body?.password === 'string' ? body.password : '';
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
