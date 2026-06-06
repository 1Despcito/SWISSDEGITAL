import type { Metadata } from 'next';
import { locales, defaultLocale, hreflangFor, type Locale } from '@/lib/i18n/routing';
import { absoluteUrl, siteUrl } from '@/lib/utils';

const SITE_NAME = 'SwissDigiAI';

type BuildMetaArgs = {
  locale: Locale;
  /** Path WITHOUT the locale prefix, e.g. "/services" or "" for home. */
  path?: string;
  title: string;
  description: string;
  /** Set true on legal/utility pages we don't want indexed prominently. */
  noindex?: boolean;
};

/**
 * Builds Next.js Metadata with canonical + full hreflang alternates
 * (all locales + x-default) and OpenGraph/Twitter cards. See brief §11.
 * OG/Twitter images come from the file-based `app/opengraph-image` +
 * `app/twitter-image` routes, which Next merges in automatically.
 */
export function buildMetadata({
  locale,
  path = '',
  title,
  description,
  noindex = false,
}: BuildMetaArgs): Metadata {
  const cleanPath = path.replace(/^\//, '');
  const localizedPath = (l: Locale) => `/${l}${cleanPath ? `/${cleanPath}` : ''}`;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[hreflangFor[l]] = absoluteUrl(localizedPath(l));
  }
  languages['x-default'] = absoluteUrl(localizedPath(defaultLocale));

  const canonical = absoluteUrl(localizedPath(locale));

  return {
    metadataBase: new URL(siteUrl()),
    title,
    description,
    alternates: { canonical, languages },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale,
      url: canonical,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
