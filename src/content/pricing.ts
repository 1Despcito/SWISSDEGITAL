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

// ── Localization ──────────────────────────────────────────────
// Package names (Starter/Growth/Premium) stay as-is; tagline + features localize.
import type { Locale } from '@/lib/i18n/routing';

type PackageCopy = { tagline: string; features: string[] };

const packageCopyI18n: Partial<Record<Locale, Record<string, PackageCopy>>> = {
  de: {
    starter: {
      tagline: 'Für kleine Unternehmen, die richtig online gehen.',
      features: [
        'Markengerechte Website (bis zu 5 Seiten)',
        'Social Media (8 Posts / Monat)',
        'Basis-SEO-Setup',
        'Monatlicher Performance-Bericht',
        'E-Mail-Support',
      ],
    },
    growth: {
      tagline: 'Für Marken, die über Kanäle hinweg skalieren wollen.',
      features: [
        'Alles aus Starter',
        'Website mit CMS + mehrsprachig',
        'Social Media (16 Posts / Monat)',
        'Performance-Ads-Management',
        'KI-Assistent auf Ihrer Website',
        'Priorisierter Support',
      ],
    },
    premium: {
      tagline: 'Für ambitionierte Teams, die den vollen Stack wollen.',
      features: [
        'Alles aus Growth',
        'Individuelle App oder KI-System',
        'Dedizierte Strategie & Senior-Team',
        'Erweiterte Automation & Integrationen',
        'Quartals-Growth-Roadmap',
        'Support am selben Tag',
      ],
    },
  },
  fr: {
    starter: {
      tagline: 'Pour les petites entreprises qui passent vraiment en ligne.',
      features: [
        'Site fidèle à la marque (jusqu’à 5 pages)',
        'Réseaux sociaux (8 posts / mois)',
        'Configuration SEO de base',
        'Rapport de performance mensuel',
        'Support par e-mail',
      ],
    },
    growth: {
      tagline: 'Pour les marques prêtes à se développer sur tous les canaux.',
      features: [
        'Tout ce qu’inclut Starter',
        'Site avec CMS + multilingue',
        'Réseaux sociaux (16 posts / mois)',
        'Gestion des publicités performance',
        'Assistant IA sur votre site',
        'Support prioritaire',
      ],
    },
    premium: {
      tagline: 'Pour les équipes ambitieuses qui veulent toute la chaîne.',
      features: [
        'Tout ce qu’inclut Growth',
        'App ou système IA sur mesure',
        'Stratégie dédiée & équipe senior',
        'Automatisation & intégrations avancées',
        'Feuille de route de croissance trimestrielle',
        'Support le jour même',
      ],
    },
  },
  it: {
    starter: {
      tagline: 'Per piccole imprese che vogliono essere online sul serio.',
      features: [
        'Sito in linea col brand (fino a 5 pagine)',
        'Social media (8 post / mese)',
        'Setup SEO di base',
        'Report di performance mensile',
        'Supporto via email',
      ],
    },
    growth: {
      tagline: 'Per brand pronti a scalare su più canali.',
      features: [
        'Tutto ciò che include Starter',
        'Sito con CMS + multilingue',
        'Social media (16 post / mese)',
        'Gestione delle performance ads',
        'Assistente IA sul tuo sito',
        'Supporto prioritario',
      ],
    },
    premium: {
      tagline: 'Per team ambiziosi che vogliono l’intero stack.',
      features: [
        'Tutto ciò che include Growth',
        'App o sistema IA su misura',
        'Strategia dedicata & team senior',
        'Automazione & integrazioni avanzate',
        'Roadmap di crescita trimestrale',
        'Supporto in giornata',
      ],
    },
  },
  ar: {
    starter: {
      tagline: 'للأعمال الصغيرة التي تريد حضوراً إلكترونياً متيناً.',
      features: [
        'موقع متوافق مع العلامة (حتى 5 صفحات)',
        'وسائل تواصل (8 منشورات / شهر)',
        'إعداد سيو أساسي',
        'تقرير أداء شهري',
        'دعم عبر البريد الإلكتروني',
      ],
    },
    growth: {
      tagline: 'للعلامات الجاهزة للتوسّع عبر القنوات.',
      features: [
        'كل ما في باقة Starter',
        'موقع مع نظام إدارة محتوى + متعدد اللغات',
        'وسائل تواصل (16 منشوراً / شهر)',
        'إدارة إعلانات الأداء',
        'مساعد ذكي على موقعك',
        'دعم بأولوية',
      ],
    },
    premium: {
      tagline: 'للفِرق الطموحة التي تريد المنظومة كاملة.',
      features: [
        'كل ما في باقة Growth',
        'تطبيق مخصّص أو نظام ذكاء اصطناعي',
        'استراتيجية مخصّصة وفريق خبير',
        'أتمتة وتكاملات متقدّمة',
        'خارطة نمو ربع سنوية',
        'دعم في نفس اليوم',
      ],
    },
  },
};

/** Packages with tagline + features localized for `locale` (English fallback). */
export function getPackages(locale: string = 'en'): PricingPackage[] {
  if (locale === 'en') return packages;
  const map = packageCopyI18n[locale as Locale];
  if (!map) return packages;
  return packages.map((p) => {
    const copy = map[p.id];
    return copy ? { ...p, tagline: copy.tagline, features: copy.features } : p;
  });
}
