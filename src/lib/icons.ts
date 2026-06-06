import {
  Share2,
  Megaphone,
  Code2,
  Smartphone,
  BrainCircuit,
  Palette,
  Search,
  Rocket,
  ShieldCheck,
  Sparkles,
  Globe2,
  Gauge,
  type LucideIcon,
} from 'lucide-react';

/**
 * String-keyed icon registry so content data files stay serializable
 * (CMS-ready) — content references an icon by key, not a component.
 */
export const icons = {
  social: Share2,
  ads: Megaphone,
  web: Code2,
  app: Smartphone,
  ai: BrainCircuit,
  branding: Palette,
  seo: Search,
  rocket: Rocket,
  shield: ShieldCheck,
  sparkles: Sparkles,
  globe: Globe2,
  gauge: Gauge,
} as const;

export type IconKey = keyof typeof icons;

export function getIcon(key: IconKey): LucideIcon {
  return icons[key];
}
