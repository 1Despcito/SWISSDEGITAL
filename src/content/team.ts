/**
 * Team grid. Placeholder members — replace with real people/photos.
 * `initials` renders an on-brand avatar until `photo` (a /public path) is set.
 */
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  photo?: string;
};

export const team: TeamMember[] = [
  {
    id: 'karim',
    name: 'Karim Shawky',
    role: 'Founder & Lead',
    bio: 'Bridges strategy, design and AI engineering to ship outcomes, not just deliverables.',
    initials: 'KS',
  },
  {
    id: 'design',
    name: 'Design Lead',
    role: 'Brand & Product Design',
    bio: 'Crafts premium identities and interfaces with Swiss precision.',
    initials: 'DL',
  },
  {
    id: 'eng',
    name: 'Engineering Lead',
    role: 'Web, App & AI',
    bio: 'Builds fast, scalable, AI-ready products on modern stacks.',
    initials: 'EL',
  },
  {
    id: 'growth',
    name: 'Growth Lead',
    role: 'SEO & Performance',
    bio: 'Turns traffic into measurable, compounding growth.',
    initials: 'GL',
  },
];

// ── Localization ──────────────────────────────────────────────
import type { Locale } from '@/lib/i18n/routing';

type TeamCopy = { role: string; bio: string };

const teamI18n: Partial<Record<Locale, Record<string, TeamCopy>>> = {
  de: {
    karim: { role: 'Gründer & Lead', bio: 'Verbindet Strategie, Design und KI-Engineering, um Ergebnisse zu liefern — nicht nur Deliverables.' },
    design: { role: 'Brand- & Produktdesign', bio: 'Gestaltet hochwertige Identitäten und Interfaces mit Schweizer Präzision.' },
    eng: { role: 'Web, App & KI', bio: 'Baut schnelle, skalierbare, KI-bereite Produkte auf modernem Stack.' },
    growth: { role: 'SEO & Performance', bio: 'Verwandelt Traffic in messbares, kumulatives Wachstum.' },
  },
  fr: {
    karim: { role: 'Fondateur & Lead', bio: 'Relie stratégie, design et ingénierie IA pour livrer des résultats, pas seulement des livrables.' },
    design: { role: 'Design de marque & produit', bio: 'Crée des identités et interfaces premium avec la précision suisse.' },
    eng: { role: 'Web, app & IA', bio: 'Bâtit des produits rapides, évolutifs et prêts pour l’IA sur des stacks modernes.' },
    growth: { role: 'SEO & performance', bio: 'Transforme le trafic en croissance mesurable et cumulative.' },
  },
  it: {
    karim: { role: 'Fondatore & Lead', bio: 'Unisce strategia, design e ingegneria IA per consegnare risultati, non solo deliverable.' },
    design: { role: 'Design di brand & prodotto', bio: 'Crea identità e interfacce premium con precisione svizzera.' },
    eng: { role: 'Web, app & IA', bio: 'Costruisce prodotti veloci, scalabili e pronti per l’IA su stack moderni.' },
    growth: { role: 'SEO & performance', bio: 'Trasforma il traffico in crescita misurabile e cumulativa.' },
  },
  ar: {
    karim: { role: 'المؤسس والقائد', bio: 'يربط الاستراتيجية والتصميم وهندسة الذكاء الاصطناعي لتحقيق نتائج، لا مجرد مُخرجات.' },
    design: { role: 'تصميم العلامة والمنتج', bio: 'يصمّم هويات وواجهات فاخرة بدقة سويسرية.' },
    eng: { role: 'الويب والتطبيقات والذكاء الاصطناعي', bio: 'يبني منتجات سريعة وقابلة للتوسّع وجاهزة للذكاء الاصطناعي بتقنيات حديثة.' },
    growth: { role: 'السيو والأداء', bio: 'يحوّل الزيارات إلى نمو متراكم وقابل للقياس.' },
  },
};

/** Team with role + bio localized for `locale` (English fallback). */
export function getTeam(locale: string = 'en'): TeamMember[] {
  if (locale === 'en') return team;
  const map = teamI18n[locale as Locale];
  if (!map) return team;
  return team.map((m) => {
    const copy = map[m.id];
    return copy ? { ...m, ...copy } : m;
  });
}
