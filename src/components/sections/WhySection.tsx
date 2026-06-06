import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { getIcon, type IconKey } from '@/lib/icons';

const ITEMS: { key: string; icon: IconKey }[] = [
  { key: 'precision', icon: 'shield' },
  { key: 'ai', icon: 'sparkles' },
  { key: 'fullstack', icon: 'rocket' },
  { key: 'local', icon: 'globe' },
];

export function WhySection() {
  const t = useTranslations('Home.why');

  return (
    <Section tone="cloud">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="mt-4 text-h2">{t('title')}</h2>
        </div>
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
          {ITEMS.map(({ key, icon }) => {
            const Icon = getIcon(icon);
            return (
              <Reveal as="div" key={key} className="rounded-2xl border border-line/[0.06] bg-card p-6 shadow-soft">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/15 text-blue">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{t(`items.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(`items.${key}.body`)}</p>
              </Reveal>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
