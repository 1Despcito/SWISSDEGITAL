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

export type LeadRow = {
  id: string;
  created_at: string;
  source: string;
  name: string | null;
  email: string;
  company: string | null;
  service: string | null;
  package: string | null;
  budget: string | null;
  language: string | null;
  message: string | null;
};

export type LeadStats = {
  total: number;
  today: number;
  week: number;
  bySource: { source: string; count: number }[];
  daily: { day: string; count: number }[]; // last 14 days, oldest→newest
};

/** Read recent leads (newest first) for the dashboard table. */
export async function getLeads(limit = 500): Promise<LeadRow[]> {
  if (!sql) return [];
  try {
    await ensureTable();
    const rows = await sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT ${limit}`;
    return rows as LeadRow[];
  } catch (err) {
    console.error('[db:getLeads-failed]', err);
    return [];
  }
}

/** Aggregate lead metrics for the dashboard analytics cards + trend chart. */
export async function getLeadStats(): Promise<LeadStats> {
  const empty: LeadStats = { total: 0, today: 0, week: 0, bySource: [], daily: [] };
  if (!sql) return empty;
  try {
    await ensureTable();
    const [totals] = (await sql`
      SELECT
        count(*)::int AS total,
        count(*) FILTER (WHERE created_at::date = current_date)::int AS today,
        count(*) FILTER (WHERE created_at > now() - interval '7 days')::int AS week
      FROM leads
    `) as { total: number; today: number; week: number }[];

    const bySource = (await sql`
      SELECT source, count(*)::int AS count FROM leads GROUP BY source ORDER BY count DESC
    `) as { source: string; count: number }[];

    const daily = (await sql`
      SELECT to_char(created_at::date, 'YYYY-MM-DD') AS day, count(*)::int AS count
      FROM leads
      WHERE created_at > now() - interval '14 days'
      GROUP BY 1 ORDER BY 1
    `) as { day: string; count: number }[];

    return { total: totals?.total ?? 0, today: totals?.today ?? 0, week: totals?.week ?? 0, bySource, daily };
  } catch (err) {
    console.error('[db:getLeadStats-failed]', err);
    return empty;
  }
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
