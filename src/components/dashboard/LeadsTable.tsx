'use client';

import { useMemo, useState } from 'react';
import { Search, Download } from 'lucide-react';
import type { LeadRow } from '@/lib/db';
import { cn } from '@/lib/utils';

const SOURCE_STYLES: Record<string, string> = {
  'contact form': 'bg-blue/10 text-blue',
  chatbot: 'bg-cyan/15 text-cyan-400',
  newsletter: 'bg-emerald-500/10 text-emerald-600',
};

function toCsv(rows: LeadRow[]): string {
  const cols: (keyof LeadRow)[] = [
    'created_at', 'source', 'name', 'email', 'company', 'service', 'package', 'budget', 'language', 'message',
  ];
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const header = cols.join(',');
  const body = rows.map((r) => cols.map((c) => esc(r[c])).join(',')).join('\n');
  return `${header}\n${body}`;
}

export function LeadsTable({ leads }: { leads: LeadRow[] }) {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('all');

  const sources = useMemo(
    () => Array.from(new Set(leads.map((l) => l.source))),
    [leads],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (source !== 'all' && l.source !== source) return false;
      if (!q) return true;
      return [l.name, l.email, l.company, l.message, l.service]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(q));
    });
  }, [leads, query, source]);

  function exportCsv() {
    const blob = new Blob([toCsv(filtered)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `swissdigiai-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-2xl border border-line/10 bg-card shadow-soft">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-line/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, message…"
              className="h-10 w-full rounded-full border border-line/10 bg-surface ps-9 pe-4 text-sm text-ink focus:border-blue focus:outline-none"
            />
          </div>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="h-10 rounded-full border border-line/10 bg-surface px-3 text-sm text-ink focus:border-blue focus:outline-none"
          >
            <option value="all">All sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-ink-muted">{filtered.length} leads</span>
          <button
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-blue px-4 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
          >
            <Download className="h-4 w-4" aria-hidden />
            CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-start text-sm">
          <thead>
            <tr className="border-b border-line/10 text-xs uppercase tracking-wider text-ink-muted">
              <Th>Date</Th>
              <Th>Source</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Company</Th>
              <Th>Service</Th>
              <Th>Budget</Th>
              <Th>Message</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-ink-muted">
                  No leads yet. Submissions from the contact form, chatbot and newsletter will appear here.
                </td>
              </tr>
            ) : (
              filtered.map((l) => (
                <tr key={l.id} className="border-b border-line/[0.06] align-top hover:bg-surface">
                  <Td className="whitespace-nowrap text-ink-muted">
                    {new Date(l.created_at).toLocaleDateString('en-CH', {
                      day: '2-digit', month: 'short', year: '2-digit',
                    })}
                  </Td>
                  <Td>
                    <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', SOURCE_STYLES[l.source] ?? 'bg-surface text-ink-muted')}>
                      {l.source}
                    </span>
                  </Td>
                  <Td className="font-medium text-ink">{l.name ?? '—'}</Td>
                  <Td>
                    <a href={`mailto:${l.email}`} className="text-blue hover:underline">
                      {l.email}
                    </a>
                  </Td>
                  <Td className="text-ink-muted">{l.company ?? '—'}</Td>
                  <Td className="text-ink-muted">{l.service ?? l.package ?? '—'}</Td>
                  <Td className="whitespace-nowrap text-ink-muted">{l.budget ?? '—'}</Td>
                  <Td className="max-w-xs text-ink-muted">
                    <span className="line-clamp-2">{l.message ?? '—'}</span>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 text-start font-medium">{children}</th>;
}
function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn('px-4 py-3', className)}>{children}</td>;
}
