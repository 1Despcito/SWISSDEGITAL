import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Counter } from '@/components/motion/Counter';

const STATS: { key: string; value: number; suffix: string }[] = [
  { key: 'projects', value: 120, suffix: '+' },
  { key: 'growth', value: 3, suffix: '×' },
  { key: 'response', value: 2, suffix: 'h' },
  { key: 'retention', value: 95, suffix: '%' },
];

export function StatsBand() {
  const t = useTranslations('Home.stats');

  return (
    <Section tone="dark">
      <h2 className="sr-only">{t('title')}</h2>
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.key} className="text-center">
            <p className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-white/60">{t(`items.${s.key}.label`)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
