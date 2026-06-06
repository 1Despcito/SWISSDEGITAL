import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, Users, CalendarDays, TrendingUp } from 'lucide-react';
import { isAuthed } from '@/lib/auth';
import { dbConfigured, getLeads, getLeadStats } from '@/lib/db';
import { LogoMark } from '@/components/layout/Logo';
import { LeadsTable } from '@/components/dashboard/LeadsTable';
import { LogoutButton } from '@/components/dashboard/LogoutButton';

export const dynamic = 'force-dynamic';

/** Builds a continuous last-14-days series from the (sparse) DB aggregate. */
function fill14Days(daily: { day: string; count: number }[]) {
  const map = new Map(daily.map((d) => [d.day, d.count]));
  const out: { day: string; count: number }[] = [];
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    out.push({ day: key, count: map.get(key) ?? 0 });
  }
  return out;
}

export default async function DashboardPage() {
  if (!isAuthed()) redirect('/dashboard/login');

  const [stats, leads] = await Promise.all([getLeadStats(), getLeads(500)]);
  const series = fill14Days(stats.daily);
  const maxCount = Math.max(1, ...series.map((d) => d.count));

  return (
    <div>
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-line/10 bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-8 w-8" />
            <span className="font-bold tracking-tight text-ink">
              SwissDigi<span className="text-blue">AI</span>
              <span className="ms-2 text-sm font-normal text-ink-muted">Dashboard</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-ink-muted hover:text-ink"
            >
              View site
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-5 py-8">
        {!dbConfigured && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
            <code>DATABASE_URL</code> isn’t configured — connect Neon Postgres to see live leads.
          </div>
        )}

        {/* Stat cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<Users className="h-5 w-5" />} label="Total leads" value={stats.total} />
          <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Last 7 days" value={stats.week} />
          <StatCard icon={<CalendarDays className="h-5 w-5" />} label="Today" value={stats.today} />
          <div className="rounded-2xl border border-line/10 bg-card p-5 shadow-soft">
            <p className="text-sm text-ink-muted">By source</p>
            <ul className="mt-2 space-y-1">
              {stats.bySource.length === 0 ? (
                <li className="text-sm text-ink-muted">—</li>
              ) : (
                stats.bySource.map((s) => (
                  <li key={s.source} className="flex items-center justify-between text-sm">
                    <span className="capitalize text-ink-muted">{s.source}</span>
                    <span className="font-semibold text-ink">{s.count}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>

        {/* 14-day trend */}
        <section className="rounded-2xl border border-line/10 bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-ink">Leads — last 14 days</h2>
            <span className="text-sm text-ink-muted">{stats.week} this week</span>
          </div>
          <div className="mt-6 flex h-32 items-end gap-1.5">
            {series.map((d) => (
              <div key={d.day} className="group flex flex-1 flex-col items-center justify-end gap-1.5">
                <span className="text-[10px] text-ink-muted opacity-0 group-hover:opacity-100">{d.count}</span>
                <div
                  className="w-full rounded-t bg-blue/80 transition-colors group-hover:bg-blue"
                  style={{ height: `${Math.max(4, (d.count / maxCount) * 100)}%` }}
                  title={`${d.day}: ${d.count}`}
                />
                <span className="text-[10px] text-ink-muted">{d.day.slice(8, 10)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Leads table */}
        <section>
          <h2 className="mb-4 font-semibold text-ink">All leads</h2>
          <LeadsTable leads={leads} />
        </section>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-line/10 bg-card p-5 shadow-soft">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue/10 text-blue">
        {icon}
      </span>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-ink">{value.toLocaleString('en-US')}</p>
      <p className="text-sm text-ink-muted">{label}</p>
    </div>
  );
}
