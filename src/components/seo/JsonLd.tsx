import { absoluteUrl, siteUrl } from '@/lib/utils';
import type { Locale } from '@/lib/i18n/routing';

const ORG_ID = `${siteUrl()}/#organization`;
const SITE_ID = `${siteUrl()}/#website`;

/** Renders a JSON-LD script tag. `data` is a plain serializable object. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Content is server-generated from trusted data, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Global Organization + WebSite + LocalBusiness graph (brief §11). */
export function SiteJsonLd({ locale }: { locale: Locale }) {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'SwissDigiAI',
      url: siteUrl(),
      logo: absoluteUrl('/icon.svg'),
      email: 'hello@swissdigiai.ch',
      slogan: 'We build brands, websites & AI systems with Swiss precision.',
      areaServed: 'CH',
      sameAs: [
        'https://www.linkedin.com/company/swissdigiai',
        'https://www.instagram.com/swissdigiai',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: siteUrl(),
      name: 'SwissDigiAI',
      inLanguage: locale,
      publisher: { '@id': ORG_ID },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'SwissDigiAI',
      image: absoluteUrl('/icon.svg'),
      url: siteUrl(),
      email: 'hello@swissdigiai.ch',
      priceRange: 'CHF',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Zürich',
        addressCountry: 'CH',
      },
    },
  ];
  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: name,
        name,
        description,
        provider: { '@id': ORG_ID },
        areaServed: 'CH',
        url: absoluteUrl(path),
      }}
    />
  );
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((q) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: { '@type': 'Answer', text: q.answer },
        })),
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  author,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  author: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        datePublished,
        author: { '@type': 'Person', name: author },
        publisher: { '@id': ORG_ID },
        mainEntityOfPage: absoluteUrl(path),
      }}
    />
  );
}
