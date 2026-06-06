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
