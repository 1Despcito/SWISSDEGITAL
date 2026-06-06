import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { Link } from '@/lib/i18n/navigation';
import { getFeaturedCaseStudies } from '@/content/work';
import { WorkCard } from './WorkCard';

export function SelectedWork() {
  const t = useTranslations('Home.work');
  const featuredCaseStudies = getFeaturedCaseStudies(useLocale());

  return (
    <Section tone="cloud">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 className="mt-4 text-h2">{t('title')}</h2>
          <p className="mt-4 text-body-lg text-ink-muted">{t('subtitle')}</p>
        </div>
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:underline"
        >
          {t('cta')}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
        </Link>
      </div>

      <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
        {featuredCaseStudies.slice(0, 3).map((item, i) => (
          <Reveal as="div" key={item.slug} delay={i * 0.05}>
            <WorkCard item={item} priority={i === 0} />
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
