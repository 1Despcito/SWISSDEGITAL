'use client';

import { track as vercelTrack } from '@vercel/analytics';

/**
 * Custom analytics events (see brief §13). Each call forwards to both
 * GA4 (via gtag, if present) and Vercel Analytics. Safe to call anywhere
 * on the client — no-ops on the server or before scripts load.
 */
export type AnalyticsEvent =
  | 'cta_click'
  | 'lead_submit'
  | 'booking_complete'
  | 'chat_open'
  | 'chat_lead_captured'
  | 'pricing_view'
  | 'service_view'
  | 'language_switch'
  | 'scroll_75';

type Props = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, params?: Props) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, props: Props = {}): void {
  if (typeof window === 'undefined') return;

  // GA4
  try {
    window.gtag?.('event', event, props);
  } catch {
    /* analytics must never break the app */
  }

  // Vercel Analytics (string/number/boolean only)
  try {
    const clean: Record<string, string | number | boolean> = {};
    for (const [k, v] of Object.entries(props)) {
      if (v !== null && v !== undefined) clean[k] = v;
    }
    vercelTrack(event, clean);
  } catch {
    /* noop */
  }
}
