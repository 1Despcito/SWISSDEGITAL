/**
 * Blog posts — typed content, CMS-ready (swap for Sanity/Contentful later by
 * keeping this shape). English master; dates are absolute (ISO).
 */
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO date
  tags: string[];
  accent: [string, string];
  /** Body as paragraphs (rendered as <p>). Swap for MDX/portable text later. */
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: 'why-swiss-businesses-need-ai-now',
    title: 'Why Swiss businesses should adopt AI now — not later',
    excerpt:
      'AI is no longer a moonshot. Here is a pragmatic, privacy-first way for Swiss SMEs to start.',
    author: 'SwissDigiAI',
    date: '2026-04-12',
    tags: ['AI', 'Strategy'],
    accent: ['#1F6FEB', '#36C5F0'],
    body: [
      'The conversation around AI has shifted from "should we?" to "how, responsibly?". For Swiss businesses, the answer hinges on three things: clear use cases, strict data protection, and measurable ROI.',
      'Start small. A support assistant that deflects repetitive questions, or an internal tool that surfaces knowledge instantly, pays for itself fast — and builds the muscle for bigger projects.',
      'Crucially, keep your data yours. Server-side keys, data minimisation, and no training on your data are non-negotiable. That is the Swiss way, and it is also simply good engineering.',
    ],
  },
  {
    slug: 'building-fast-multilingual-sites',
    title: 'Building fast, multilingual websites that actually rank',
    excerpt:
      'Performance and proper hreflang are not optional in Switzerland. Here is our checklist.',
    author: 'SwissDigiAI',
    date: '2026-03-03',
    tags: ['Web', 'SEO'],
    accent: ['#0F2A4A', '#1F6FEB'],
    body: [
      'A multilingual market rewards sites that get internationalisation right. That means locale-prefixed URLs, complete hreflang alternates, and translated metadata — not just translated body copy.',
      'Performance is a ranking factor and a conversion lever. Ship server components, lazy-load below the fold, optimise images, and keep the hero text in the initial HTML.',
      'Measure everything. Core Web Vitals, scroll depth, and CTA clicks tell you what to fix next — and prove the work paid off.',
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Rough reading time in minutes from the body word count. */
export function readingMinutes(post: BlogPost): number {
  const words = post.body.join(' ').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
