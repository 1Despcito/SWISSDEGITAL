import type { IconKey } from '@/lib/icons';
import type { Locale } from '@/lib/i18n/routing';
import { serviceCopyI18n } from './services.i18n';

/**
 * Service catalogue — typed content (CMS-ready). English is the master copy.
 * Swap this module for a CMS fetch later without touching components: keep the
 * same shape and return localized strings per `locale`.
 */
export const serviceSlugs = [
  'social-media',
  'web-development',
  'app-development',
  'ai-systems',
  'branding',
  'seo-performance',
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];
export type ServiceCategory = 'marketing' | 'build' | 'ai' | 'brand';

export type Service = {
  slug: ServiceSlug;
  icon: IconKey;
  category: ServiceCategory;
  featured: boolean;
  /** Short title (nav, grid, footer). */
  title: string;
  /** One-line summary for cards. */
  tagline: string;
  /** Hero promise on the detail page. */
  promise: string;
  /** "What you get" checklist. */
  included: string[];
  /** Process steps specific to this service. */
  process: { title: string; body: string }[];
  /** Tangible deliverables. */
  deliverables: string[];
  faq: { question: string; answer: string }[];
  /** Related work slugs. */
  relatedWork: string[];
};

/** The localizable subset of a service (English master lives below; translations in services.i18n.ts). */
export type ServiceCopy = Pick<
  Service,
  'title' | 'tagline' | 'promise' | 'included' | 'process' | 'deliverables' | 'faq'
>;

export const services: Record<ServiceSlug, Service> = {
  'social-media': {
    slug: 'social-media',
    icon: 'social',
    category: 'marketing',
    featured: true,
    title: 'Social Media',
    tagline: 'Content and community management that actually moves the needle.',
    promise: 'A consistent, on-brand social presence that turns followers into customers.',
    included: [
      'Content strategy & monthly calendar',
      'On-brand post & reel design',
      'Copywriting in EN/DE/FR/IT',
      'Community management & inbox',
      'Monthly performance reporting',
    ],
    process: [
      { title: 'Audit', body: 'We review your channels, competitors and audience.' },
      { title: 'Strategy', body: 'We define pillars, tone and a monthly calendar.' },
      { title: 'Produce', body: 'We design, write and schedule everything.' },
      { title: 'Optimise', body: 'We double down on what performs each month.' },
    ],
    deliverables: ['Monthly content calendar', 'Designed assets', 'Performance dashboard'],
    faq: [
      {
        question: 'Which platforms do you cover?',
        answer:
          'Instagram, LinkedIn, TikTok, Facebook and YouTube — we recommend the right mix for your audience.',
      },
      {
        question: 'Do you also run paid ads?',
        answer:
          'Yes — paid social is part of our Performance Ads service and pairs naturally with organic content.',
      },
      {
        question: 'How many posts per month?',
        answer:
          'Packages typically range from 8 to 20+ posts plus stories and reels, tailored to your goals.',
      },
    ],
    relatedWork: ['alpine-fintech', 'gourmet-delivery'],
  },
  'web-development': {
    slug: 'web-development',
    icon: 'web',
    category: 'build',
    featured: true,
    title: 'Web Development',
    tagline: 'Fast, beautiful, conversion-focused websites built on modern stacks.',
    promise: 'A blazing-fast website that ranks, converts and is effortless to update.',
    included: [
      'Custom design in your brand',
      'Next.js / headless architecture',
      'Multilingual & SEO-ready',
      'CMS so you can self-edit',
      'Analytics & performance budget',
    ],
    process: [
      { title: 'Scope', body: 'We map pages, content and goals.' },
      { title: 'Design', body: 'We craft the UI and prototype key flows.' },
      { title: 'Build', body: 'We engineer it fast, accessible and SEO-ready.' },
      { title: 'Launch', body: 'We deploy, measure and hand over a CMS.' },
    ],
    deliverables: ['Production website', 'CMS access', 'Performance & SEO report'],
    faq: [
      {
        question: 'Which tech do you build on?',
        answer: 'Next.js + TypeScript on Vercel by default, with a headless CMS when you need to self-edit.',
      },
      {
        question: 'Is multilingual included?',
        answer: 'Yes — we build i18n-ready and can launch in EN/DE/FR/IT/AR.',
      },
      {
        question: 'Do you handle hosting?',
        answer: 'We deploy to Vercel and can manage it for you, or hand over full ownership.',
      },
    ],
    relatedWork: ['alpine-fintech', 'luxe-watches'],
  },
  'app-development': {
    slug: 'app-development',
    icon: 'app',
    category: 'build',
    featured: true,
    title: 'App Development',
    tagline: 'Cross-platform mobile and web apps your users will love.',
    promise: 'A polished, scalable app — shipped on time and ready to grow.',
    included: [
      'Product & UX design',
      'React Native / web app build',
      'API & backend integration',
      'App Store / Play submission',
      'Maintenance & iteration',
    ],
    process: [
      { title: 'Define', body: 'We shape an MVP that proves value fast.' },
      { title: 'Design', body: 'We prototype the core user journeys.' },
      { title: 'Build', body: 'We develop, test and integrate.' },
      { title: 'Ship', body: 'We launch to the stores and iterate.' },
    ],
    deliverables: ['Published app', 'Source code & docs', 'Roadmap for v2'],
    faq: [
      {
        question: 'Native or cross-platform?',
        answer: 'We default to React Native for one codebase across iOS and Android, going native when justified.',
      },
      {
        question: 'Can you integrate AI features?',
        answer: 'Absolutely — that is our specialty. See AI Systems.',
      },
      {
        question: 'Do you maintain the app after launch?',
        answer: 'Yes, via a monthly maintenance retainer or on-demand.',
      },
    ],
    relatedWork: ['gourmet-delivery', 'medtech-portal'],
  },
  'ai-systems': {
    slug: 'ai-systems',
    icon: 'ai',
    category: 'ai',
    featured: true,
    title: 'AI Systems',
    tagline: 'Custom AI assistants, automations and integrations that save real hours.',
    promise: 'Production-grade AI that fits your business — not a gimmick.',
    included: [
      'AI assistant / chatbot builds',
      'RAG over your own knowledge',
      'Workflow automation',
      'LLM integration (Claude / OpenAI)',
      'Guardrails, evals & monitoring',
    ],
    process: [
      { title: 'Discover', body: 'We find the highest-ROI AI use case.' },
      { title: 'Prototype', body: 'We build a working proof of concept fast.' },
      { title: 'Harden', body: 'We add guardrails, evals and monitoring.' },
      { title: 'Deploy', body: 'We ship to production and measure impact.' },
    ],
    deliverables: ['Deployed AI system', 'Eval & safety report', 'Team training'],
    faq: [
      {
        question: 'Which models do you use?',
        answer: 'We work with Anthropic Claude and OpenAI, choosing the best fit for cost, quality and privacy.',
      },
      {
        question: 'Is our data safe?',
        answer: 'We design for Swiss-grade privacy: keys server-side, data minimisation, and no training on your data.',
      },
      {
        question: 'Can it use our internal docs?',
        answer: 'Yes — we build retrieval (RAG) so the AI answers from your own knowledge base.',
      },
    ],
    relatedWork: ['medtech-portal', 'alpine-fintech'],
  },
  branding: {
    slug: 'branding',
    icon: 'branding',
    category: 'brand',
    featured: true,
    title: 'Branding',
    tagline: 'Distinctive identities — logo, system and guidelines that scale.',
    promise: 'A brand that looks premium everywhere and is easy for your team to use.',
    included: [
      'Brand strategy & positioning',
      'Logo & visual identity',
      'Typography & colour system',
      'Brand guidelines',
      'Templates & assets',
    ],
    process: [
      { title: 'Discover', body: 'We define positioning and personality.' },
      { title: 'Explore', body: 'We design identity directions.' },
      { title: 'Refine', body: 'We perfect the chosen system.' },
      { title: 'Deliver', body: 'We package guidelines and assets.' },
    ],
    deliverables: ['Logo suite', 'Brand guidelines', 'Asset & template library'],
    faq: [
      {
        question: 'Do you design logos only?',
        answer: 'We deliver a full identity system — logo, type, colour, imagery and guidelines.',
      },
      {
        question: 'Can you rebrand an existing company?',
        answer: 'Yes — we handle evolutions and full rebrands, with a smooth rollout plan.',
      },
      {
        question: 'Do we own the files?',
        answer: 'Fully. You receive all source files and usage rights.',
      },
    ],
    relatedWork: ['luxe-watches', 'gourmet-delivery'],
  },
  'seo-performance': {
    slug: 'seo-performance',
    icon: 'seo',
    category: 'marketing',
    featured: true,
    title: 'SEO & Performance Ads',
    tagline: 'Get found and get leads — organic search plus paid campaigns.',
    promise: 'More qualified traffic and leads, measured to the franc.',
    included: [
      'Technical & on-page SEO',
      'Keyword & content strategy',
      'Google & Meta ad campaigns',
      'Conversion tracking setup',
      'Monthly growth reporting',
    ],
    process: [
      { title: 'Audit', body: 'We benchmark rankings, speed and tracking.' },
      { title: 'Plan', body: 'We prioritise quick wins and a content roadmap.' },
      { title: 'Execute', body: 'We optimise, publish and run campaigns.' },
      { title: 'Scale', body: 'We reinvest in what drives ROI.' },
    ],
    deliverables: ['SEO audit & roadmap', 'Live campaigns', 'Growth dashboard'],
    faq: [
      {
        question: 'How fast will I rank?',
        answer: 'SEO compounds over 3–6 months; paid ads can drive leads from week one while SEO matures.',
      },
      {
        question: 'Do you manage ad spend?',
        answer: 'Yes — we set up, run and optimise Google and Meta campaigns; ad budget is billed separately.',
      },
      {
        question: 'How do you report?',
        answer: 'A live dashboard plus a monthly summary tied to leads and revenue, not vanity metrics.',
      },
    ],
    relatedWork: ['luxe-watches', 'medtech-portal'],
  },
};

/** English master list (use getLocalizedServices for locale-aware copy). */
export const serviceList: Service[] = serviceSlugs.map((s) => services[s]);

/** A single service with its copy localized for `locale` (English fallback). */
export function getService(slug: string, locale: string = 'en'): Service | undefined {
  const base = (services as Record<string, Service>)[slug];
  if (!base) return undefined;
  if (locale === 'en') return base;
  const copy = serviceCopyI18n[locale as Locale]?.[slug as ServiceSlug];
  return copy ? { ...base, ...copy } : base;
}

/** All services with copy localized for `locale` (English fallback). */
export function getLocalizedServices(locale: string = 'en'): Service[] {
  return serviceSlugs.map((s) => getService(s, locale)!);
}
