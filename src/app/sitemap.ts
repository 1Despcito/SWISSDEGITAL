import type { MetadataRoute } from 'next';
import { locales, defaultLocale, hreflangFor, type Locale } from '@/lib/i18n/routing';
import { absoluteUrl } from '@/lib/utils';
import { serviceSlugs } from '@/content/services';
import { caseStudies } from '@/content/work';
import { posts } from '@/content/blog';

/** Locale-prefixed sitemap with hreflang alternates for every page (brief §11). */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '',
    '/services',
    '/work',
    '/about',
    '/pricing',
    '/contact',
    '/blog',
    '/legal/privacy',
    '/legal/imprint',
    '/legal/terms',
  ];

  const dynamicPaths = [
    ...serviceSlugs.map((s) => `/services/${s}`),
    ...caseStudies.map((c) => `/work/${c.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];

  const allPaths = [...staticPaths, ...dynamicPaths];
  const localized = (l: Locale, path: string) => absoluteUrl(`/${l}${path}`);

  return allPaths.map((path) => {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[hreflangFor[l]] = localized(l, path);
    return {
      url: localized(defaultLocale, path),
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : path.includes('/legal') ? 0.3 : 0.7,
      alternates: { languages },
    };
  });
}
