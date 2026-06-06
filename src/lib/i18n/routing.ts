import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'de', 'fr', 'it', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Locales rendered right-to-left. */
export const rtlLocales: readonly Locale[] = ['ar'];

export function isRtl(locale: string): boolean {
  return rtlLocales.includes(locale as Locale);
}

export function dirFor(locale: string): 'rtl' | 'ltr' {
  return isRtl(locale) ? 'rtl' : 'ltr';
}

/** Human labels for the language switcher. */
export const localeLabels: Record<Locale, { native: string; short: string }> = {
  en: { native: 'English', short: 'EN' },
  de: { native: 'Deutsch', short: 'DE' },
  fr: { native: 'Français', short: 'FR' },
  it: { native: 'Italiano', short: 'IT' },
  ar: { native: 'العربية', short: 'AR' },
};

/** BCP-47 tags for hreflang / <html lang>. */
export const hreflangFor: Record<Locale, string> = {
  en: 'en',
  de: 'de-CH',
  fr: 'fr-CH',
  it: 'it-CH',
  ar: 'ar',
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Locale-prefixed paths for every locale: /en/..., /de/..., etc.
  localePrefix: 'always',
  localeDetection: true,
});
