'use client';

import { useEffect, useState } from 'react';
import { CalendarClock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { track } from '@/lib/analytics';

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK;

type CalFn = ((...args: unknown[]) => void) & { loaded?: boolean; ns?: Record<string, unknown>; q?: unknown[] };

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

/** Ensures the Cal.com embed script is loaded and `window.Cal` is ready. */
function loadCal(): Promise<CalFn> {
  return new Promise((resolve, reject) => {
    if (window.Cal) {
      resolve(window.Cal);
      return;
    }
    const queue: unknown[] = [];
    const cal = ((...args: unknown[]) => queue.push(args)) as CalFn;
    cal.q = queue;
    window.Cal = cal;

    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    script.onload = () => resolve(window.Cal as CalFn);
    script.onerror = () => reject(new Error('cal_failed'));
    document.head.appendChild(script);
  });
}

/**
 * Cal.com inline booking embed (brief §9). Loads lazily and fires
 * `booking_complete` on a confirmed booking. Falls back to an email CTA when no
 * booking link is configured — so the path to a call is never a dead end.
 */
export function BookingEmbed() {
  const t = useTranslations('Contact');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!CAL_LINK) return;
    let cancelled = false;

    loadCal()
      .then((Cal) => {
        if (cancelled) return;
        Cal('init', { origin: 'https://app.cal.com' });
        Cal('inline', {
          elementOrSelector: '#cal-booking',
          calLink: CAL_LINK,
          config: { theme: 'light' },
        });
        Cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
        Cal('on', {
          action: 'bookingSuccessful',
          callback: () => track('booking_complete', { source: 'embed' }),
        });
      })
      .catch(() => !cancelled && setFailed(true));

    return () => {
      cancelled = true;
    };
  }, []);

  if (!CAL_LINK || failed) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-line/10 bg-surface p-6">
        <CalendarClock className="h-8 w-8 text-blue" aria-hidden />
        <p className="text-ink-muted">{t('bookingBody')}</p>
        <a
          href="mailto:hello@swissdigiai.ch?subject=Discovery%20call"
          className="inline-flex h-11 items-center justify-center rounded-full bg-blue px-6 text-sm font-medium text-white hover:bg-blue-600"
          onClick={() => track('cta_click', { label: 'booking_email_fallback' })}
        >
          {t('bookingTitle')}
        </a>
      </div>
    );
  }

  return (
    <div
      id="cal-booking"
      className="min-h-[560px] overflow-hidden rounded-2xl border border-line/10 bg-card"
    />
  );
}
