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
