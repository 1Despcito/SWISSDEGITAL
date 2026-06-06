/**
 * Client-facing pricing — ONE price per package (brief §6.6). Internal tiering
 * is not exposed. Prices are starting points in CHF and exclude Swiss VAT (8.1%).
 */
export type BillingMode = 'monthly' | 'project';

export type PricingPackage = {
  id: string;
  name: string;
  /** Who it's for. */
  tagline: string;
  /** Price in CHF (number) for the given mode. */
  monthly?: number;
  project?: number;
  popular?: boolean;
  features: string[];
  /** Pre-fills the contact form package field. */
  cta: string;
};

export const packages: PricingPackage[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For small businesses getting online properly.',
    monthly: 900,
    project: 4500,
    features: [
      'Brand-aligned website (up to 5 pages)',
      'Social media (8 posts / month)',
      'Basic SEO setup',
      'Monthly performance report',
      'Email support',
    ],
    cta: 'Starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For brands ready to scale across channels.',
    monthly: 2400,
    project: 12000,
    popular: true,
    features: [
      'Everything in Starter',
      'Website with CMS + multilingual',
      'Social media (16 posts / month)',
      'Performance ads management',
      'AI assistant on your site',
      'Priority support',
    ],
    cta: 'Growth',
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'For ambitious teams that want the full stack.',
    monthly: 4900,
    project: 28000,
    features: [
      'Everything in Growth',
      'Custom app or AI system',
      'Dedicated strategy & senior team',
      'Advanced automation & integrations',
      'Quarterly growth roadmap',
      'Same-day support',
    ],
    cta: 'Premium',
  },
];

export const VAT_RATE = 0.081;
