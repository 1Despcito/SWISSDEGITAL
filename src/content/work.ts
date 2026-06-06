import type { ServiceSlug } from './services';

/**
 * Case studies — placeholder concepts with a clearly swappable shape (brief §6.4).
 * No real client names are exposed; replace with real projects or keep as
 * "Confidential client". Thumbnails render as branded gradients (no image files
 * required) until real imagery is added — set `image` to a /public path to use one.
 */
export type Metric = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  client: string;
  confidential: boolean;
  category: ServiceSlug;
  categoryLabel: string;
  /** Two-tone gradient for the placeholder thumbnail. */
  accent: [string, string];
  /** Optional real image path under /public. */
  image?: string;
  featured: boolean;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  results: Metric[];
  tech: string[];
  quote?: { text: string; author: string; role: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'alpine-fintech',
    client: 'Alpine Fintech (concept)',
    confidential: true,
    category: 'web-development',
    categoryLabel: 'Web · AI',
    accent: ['#1F6FEB', '#36C5F0'],
    featured: true,
    year: '2025',
    summary: 'A multilingual marketing site + AI support assistant for a Swiss fintech.',
    challenge:
      'A fast-growing fintech needed a credible, multilingual web presence and wanted to cut repetitive support questions without hiring.',
    solution:
      'We designed and built a Next.js site in four languages and shipped a Claude-powered assistant trained on their product docs, with human handoff for complex cases.',
    results: [
      { value: '+38%', label: 'Qualified leads' },
      { value: '−45%', label: 'Support tickets' },
      { value: '0.9s', label: 'LCP on mobile' },
    ],
    tech: ['Next.js', 'TypeScript', 'next-intl', 'Anthropic Claude', 'Vercel'],
    quote: {
      text: 'They shipped faster than our in-house roadmap and the AI assistant paid for itself in a month.',
      author: 'Confidential',
      role: 'Head of Growth',
    },
  },
  {
    slug: 'gourmet-delivery',
    client: 'Gourmet Delivery (concept)',
    confidential: true,
    category: 'app-development',
    categoryLabel: 'App · Branding',
    accent: ['#0F2A4A', '#1F6FEB'],
    featured: true,
    year: '2025',
    summary: 'Brand identity and a cross-platform ordering app for a premium meal service.',
    challenge:
      'A premium meal service had loyal customers but a clunky ordering flow and an inconsistent brand.',
    solution:
      'We rebuilt the brand and shipped a React Native app with a frictionless reorder flow, push notifications and a loyalty system.',
    results: [
      { value: '×2.4', label: 'Repeat orders' },
      { value: '4.8★', label: 'App store rating' },
      { value: '+22%', label: 'Avg. order value' },
    ],
    tech: ['React Native', 'Expo', 'Stripe', 'Figma'],
    quote: {
      text: 'Our customers finally have an app that feels as premium as the food.',
      author: 'Confidential',
      role: 'Founder',
    },
  },
  {
    slug: 'luxe-watches',
    client: 'Luxe Watches (concept)',
    confidential: true,
    category: 'branding',
    categoryLabel: 'Branding · SEO',
    accent: ['#143D6B', '#36C5F0'],
    featured: true,
    year: '2024',
    summary: 'A refined identity and SEO overhaul for a Swiss watch retailer.',
    challenge:
      'An established watch retailer looked dated online and was invisible for high-intent search terms.',
    solution:
      'We modernised the identity, rebuilt the storefront for speed, and ran a technical SEO + content programme targeting buyer keywords.',
    results: [
      { value: '+156%', label: 'Organic traffic' },
      { value: 'Top 3', label: 'Key rankings' },
      { value: '+31%', label: 'Online revenue' },
    ],
    tech: ['Next.js', 'Sanity', 'Google Search Console', 'GA4'],
  },
  {
    slug: 'medtech-portal',
    client: 'MedTech Portal (concept)',
    confidential: true,
    category: 'ai-systems',
    categoryLabel: 'AI · Web',
    accent: ['#0A1B2E', '#1F6FEB'],
    featured: false,
    year: '2024',
    summary: 'A secure internal knowledge assistant for a medtech company.',
    challenge:
      'Staff wasted hours searching scattered internal documentation across systems.',
    solution:
      'We built a private RAG assistant over their approved documents with strict access controls and full answer citations.',
    results: [
      { value: '−6h', label: 'Saved / person / week' },
      { value: '100%', label: 'Cited answers' },
      { value: 'SOC-ready', label: 'Access controls' },
    ],
    tech: ['Next.js', 'Anthropic Claude', 'Vector DB', 'Vercel'],
    quote: {
      text: 'It answers in seconds what used to take half a morning to find.',
      author: 'Confidential',
      role: 'Operations Lead',
    },
  },
];

export const featuredCaseStudies = caseStudies.filter((c) => c.featured);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function caseStudiesBySlugs(slugs: string[]): CaseStudy[] {
  return slugs.map((s) => getCaseStudy(s)).filter((c): c is CaseStudy => Boolean(c));
}
