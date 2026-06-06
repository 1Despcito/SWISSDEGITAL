'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { Globe, Check } from 'lucide-react';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { locales, localeLabels, type Locale } from '@/lib/i18n/routing';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    track('language_switch', { from: locale, to: next });
    // Preserve the current path; next-intl swaps the locale prefix.
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Switch language"
        disabled={isPending}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors',
          tone === 'light'
            ? 'text-white/80 hover:bg-white/10 hover:text-white'
            : 'text-ink/70 hover:bg-ink/5 hover:text-ink',
        )}
      >
        <Globe className="h-4 w-4" aria-hidden />
        {localeLabels[locale].short}
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-line/10 bg-card p-1 shadow-lift"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                role="option"
                aria-selected={l === locale}
                onClick={() => switchTo(l)}
                className={cn(
                  'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-start text-sm text-ink transition-colors hover:bg-surface',
                  l === locale && 'font-semibold',
                )}
              >
                <span>{localeLabels[l].native}</span>
                {l === locale && <Check className="h-4 w-4 text-blue" aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
