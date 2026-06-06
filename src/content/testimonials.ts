/**
 * Client testimonials. Placeholder quotes — replace with approved real ones.
 * `initials` renders an on-brand avatar so no photo files are required yet;
 * set `photo` to a /public path to use a real image.
 */
export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'SwissDigiAI rebuilt our site and added an AI assistant that handles half our inbound questions. Leads are up, support load is down.',
    author: 'M. Keller',
    role: 'Head of Growth',
    company: 'Fintech (confidential)',
    initials: 'MK',
  },
  {
    id: 't2',
    quote:
      'Genuinely premium work, delivered on time. The brand and app finally match the quality of our product.',
    author: 'S. Brunner',
    role: 'Founder',
    company: 'D2C brand',
    initials: 'SB',
  },
  {
    id: 't3',
    quote:
      'They understand both design and AI — rare in one team. Our internal assistant saves everyone hours every week.',
    author: 'L. Moser',
    role: 'Operations Lead',
    company: 'MedTech',
    initials: 'LM',
  },
  {
    id: 't4',
    quote:
      'Clear pricing, clear timelines, no surprises. Exactly the Swiss reliability we hoped for.',
    author: 'A. Rossi',
    role: 'Marketing Director',
    company: 'Retail',
    initials: 'AR',
  },
];

// ── Localization ──────────────────────────────────────────────
import type { Locale } from '@/lib/i18n/routing';

type TestimonialCopy = { quote: string; role: string; company: string };

const testimonialI18n: Partial<Record<Locale, Record<string, TestimonialCopy>>> = {
  de: {
    t1: { quote: 'SwissDigiAI hat unsere Website neu gebaut und einen KI-Assistenten ergänzt, der die Hälfte unserer Anfragen übernimmt. Mehr Leads, weniger Support-Last.', role: 'Head of Growth', company: 'Fintech (vertraulich)' },
    t2: { quote: 'Wirklich hochwertige Arbeit, pünktlich geliefert. Marke und App entsprechen endlich der Qualität unseres Produkts.', role: 'Gründer', company: 'D2C-Marke' },
    t3: { quote: 'Sie verstehen Design und KI gleichermassen — selten in einem Team. Unser interner Assistent spart allen jede Woche Stunden.', role: 'Operations Lead', company: 'MedTech' },
    t4: { quote: 'Klare Preise, klare Termine, keine Überraschungen. Genau die Schweizer Verlässlichkeit, die wir erhofft hatten.', role: 'Marketing-Leiterin', company: 'Retail' },
  },
  fr: {
    t1: { quote: 'SwissDigiAI a refait notre site et ajouté un assistant IA qui gère la moitié de nos demandes. Plus de leads, moins de charge support.', role: 'Head of Growth', company: 'Fintech (confidentiel)' },
    t2: { quote: 'Un travail vraiment premium, livré à temps. La marque et l’app sont enfin à la hauteur de notre produit.', role: 'Fondateur', company: 'Marque D2C' },
    t3: { quote: 'Ils maîtrisent le design ET l’IA — rare dans une même équipe. Notre assistant interne fait gagner des heures à tout le monde chaque semaine.', role: 'Responsable des opérations', company: 'MedTech' },
    t4: { quote: 'Tarifs clairs, délais clairs, aucune surprise. Exactement la fiabilité suisse que nous espérions.', role: 'Directrice marketing', company: 'Retail' },
  },
  it: {
    t1: { quote: 'SwissDigiAI ha rifatto il nostro sito e aggiunto un assistente IA che gestisce metà delle richieste. Più lead, meno carico sul supporto.', role: 'Head of Growth', company: 'Fintech (riservato)' },
    t2: { quote: 'Un lavoro davvero premium, consegnato in tempo. Brand e app sono finalmente all’altezza del nostro prodotto.', role: 'Fondatore', company: 'Brand D2C' },
    t3: { quote: 'Capiscono sia il design sia l’IA — raro in un unico team. Il nostro assistente interno fa risparmiare ore a tutti ogni settimana.', role: 'Responsabile operazioni', company: 'MedTech' },
    t4: { quote: 'Prezzi chiari, tempi chiari, nessuna sorpresa. Esattamente l’affidabilità svizzera che speravamo.', role: 'Direttrice marketing', company: 'Retail' },
  },
  ar: {
    t1: { quote: 'أعادت SwissDigiAI بناء موقعنا وأضافت مساعداً ذكياً يتولّى نصف استفساراتنا. العملاء زادوا وعبء الدعم قلّ.', role: 'رئيس النمو', company: 'فينتك (سرّي)' },
    t2: { quote: 'عمل فاخر فعلاً وسُلّم في وقته. أخيراً صارت العلامة والتطبيق بمستوى جودة منتجنا.', role: 'المؤسس', company: 'علامة D2C' },
    t3: { quote: 'يفهمون التصميم والذكاء الاصطناعي معاً — وهذا نادر في فريق واحد. مساعدنا الداخلي يوفّر للجميع ساعات كل أسبوع.', role: 'مدير العمليات', company: 'تكنولوجيا طبية' },
    t4: { quote: 'أسعار واضحة ومواعيد واضحة وبلا مفاجآت. تماماً الموثوقية السويسرية التي تمنّيناها.', role: 'مديرة التسويق', company: 'تجزئة' },
  },
};

/** Testimonials with quote/role/company localized for `locale` (English fallback). */
export function getTestimonials(locale: string = 'en'): Testimonial[] {
  if (locale === 'en') return testimonials;
  const map = testimonialI18n[locale as Locale];
  if (!map) return testimonials;
  return testimonials.map((t) => {
    const copy = map[t.id];
    return copy ? { ...t, ...copy } : t;
  });
}
