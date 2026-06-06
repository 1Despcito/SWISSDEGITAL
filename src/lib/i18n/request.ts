import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';
import en from '@/messages/en.json';

type Messages = typeof en;

/**
 * Deep-merge a (possibly partial) locale's messages over the English master.
 * This lets DE/FR/IT/AR ship partial translations from day one without ever
 * throwing MISSING_MESSAGE — untranslated keys gracefully fall back to EN.
 */
function deepMerge<T>(base: T, override: unknown): T {
  if (
    typeof base !== 'object' ||
    base === null ||
    typeof override !== 'object' ||
    override === null
  ) {
    return (override ?? base) as T;
  }
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
    out[key] = deepMerge((base as Record<string, unknown>)[key], value);
  }
  return out as T;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale =
    requested && routing.locales.includes(requested as Locale)
      ? (requested as Locale)
      : routing.defaultLocale;

  const localized =
    locale === 'en'
      ? en
      : ((await import(`@/messages/${locale}.json`)).default as Partial<Messages>);

  return {
    locale,
    messages: deepMerge(en, localized) as Messages,
    timeZone: 'Europe/Zurich',
    now: new Date(),
  };
});
