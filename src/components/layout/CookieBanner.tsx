'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

const STORAGE_KEY = 'sda-consent';

/**
 * Minimal EU/CH cookie consent. Stores the choice in localStorage and reveals
 * a non-blocking banner only on first visit. Analytics scripts should check
 * `localStorage['sda-consent'] === 'all'` before loading non-essential trackers.
 */
export function CookieBanner() {
  const t = useTranslations('Cookie');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* storage blocked — don't nag */
    }
  }, []);

  function decide(choice: 'all' | 'essential') {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
      document.cookie = `${STORAGE_KEY}=${choice};path=/;max-age=31536000;samesite=lax`;
    } catch {
      /* noop */
    }
    setVisible(false);
    if (choice === 'all') window.dispatchEvent(new Event('sda-consent-granted'));
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t('title')}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-line/10 bg-card/95 p-4 shadow-lift backdrop-blur sm:inset-x-auto sm:bottom-4 sm:start-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">{t('title')}</p>
          <p className="mt-0.5 text-sm text-ink-muted">
            {t('body')}{' '}
            <Link href="/legal/privacy" className="text-blue underline-offset-2 hover:underline">
              {t('learnMore')}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => decide('essential')}
            className="h-10 rounded-full px-4 text-sm font-medium text-ink/70 hover:bg-surface"
          >
            {t('reject')}
          </button>
          <button
            onClick={() => decide('all')}
            className="h-10 rounded-full bg-blue px-5 text-sm font-medium text-white hover:bg-blue-600"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
