import 'server-only';
import { neon } from '@neondatabase/serverless';
import type { LeadEmail } from '@/lib/email';

/**
 * Neon Postgres lead-backup store (brief §8: keep a copy so no lead is ever lost).
 * HTTP-based serverless driver — safe in serverless/edge, no pooled connections to
 * exhaust. Degrades to a no-op when DATABASE_URL isn't set.
 */
const url = process.env.DATABASE_URL;
const sql = url ? neon(url) : null;

export const dbConfigured = !!sql;

let tableEnsured = false;

async function ensureTable(): Promise<void> {
  if (!sql || tableEnsured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at  timestamptz NOT NULL DEFAULT now(),
      source      text NOT NULL,
      name        text,
      email       text NOT NULL,
      company     text,
      service     text,
      budget      text,
      package     text,
      language    text,
      message     text
    )
  `;
  tableEnsured = true;
}

/** Persist a lead. Best-effort: returns false (and logs) on any failure. */
export async function saveLead(lead: LeadEmail): Promise<boolean> {
  if (!sql) return false;
  try {
    await ensureTable();
    await sql`
      INSERT INTO leads (source, name, email, company, service, budget, package, language, message)
      VALUES (
        ${lead.source},
        ${lead.name ?? null},
        ${lead.email},
        ${lead.company ?? null},
        ${lead.service ?? null},
        ${lead.budget ?? null},
        ${lead.packageName ?? null},
        ${lead.language ?? null},
        ${lead.message ?? null}
      )
    `;
    return true;
  } catch (err) {
    console.error('[db:saveLead-failed]', err);
    return false;
  }
}
