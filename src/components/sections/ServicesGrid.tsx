import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { Link } from '@/lib/i18n/navigation';
import { getLocalizedServices } from '@/content/services';
import { getIcon } from '@/lib/icons';

export function ServicesGrid() {
  const t = useTranslations('Home.services');
  const tc = useTranslations('Common');
  const serviceList = getLocalizedServices(useLocale());

  return (
    <Section tone="light">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <h2 className="mt-4 text-h2">{t('title')}</h2>
        <p className="mt-4 text-body-lg text-ink-muted">{t('subtitle')}</p>
      </div>

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {serviceList.map((s) => {
          const Icon = getIcon(s.icon);
          return (
            <Reveal as="div" key={s.slug}>
              <Link href={`/services/${s.slug}`} className="group block h-full">
                <Card interactive className="h-full">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue/10 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-ink-muted">{s.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
                    {tc('learnMore')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden />
                  </span>
                </Card>
              </Link>
            </Reveal>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
