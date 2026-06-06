import 'server-only';
import { cookies } from 'next/headers';
import crypto from 'node:crypto';

/**
 * Minimal single-password admin auth: a signed, expiring session cookie.
 * No DB table, no accounts — right-sized for one owner (brief: dashboard).
 */
export const SESSION_COOKIE = 'sda_admin';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (seconds)

function secret(): string {
  return process.env.SESSION_SECRET || process.env.DASHBOARD_PASSWORD || 'dev-only-insecure-secret';
}

function sign(data: string): string {
  return crypto.createHmac('sha256', secret()).update(data).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/** Create a signed `<expiresAtMs>.<hmac>` session token. */
export function createToken(): string {
  const data = String(Date.now() + SESSION_MAX_AGE * 1000);
  return `${data}.${sign(data)}`;
}

export function verifyToken(token?: string): boolean {
  if (!token) return false;
  const [data, sig] = token.split('.');
  if (!data || !sig) return false;
  if (!safeEqual(sig, sign(data))) return false;
  return Date.now() < Number(data);
}

/** Constant-time check of a submitted password against DASHBOARD_PASSWORD. */
export function checkPassword(input: string): boolean {
  const pw = process.env.DASHBOARD_PASSWORD;
  if (!pw) return false;
  return safeEqual(input, pw);
}

/** Whether the current request carries a valid admin session. */
export function isAuthed(): boolean {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifyToken(token);
}

/** True when a password is configured (dashboard usable). */
export const authConfigured = !!process.env.DASHBOARD_PASSWORD;
