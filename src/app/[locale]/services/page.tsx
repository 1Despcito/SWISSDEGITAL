import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { Link } from '@/lib/i18n/navigation';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { serviceList } from '@/content/services';
import { getIcon } from '@/lib/icons';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'Services' });
  return buildMetadata({ locale, path: '/services', title: t('metaTitle'), description: t('metaDescription') });
}

export default function ServicesPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <ServicesContent />;
}

function ServicesContent() {
  const t = useTranslations('Services');
  const tc = useTranslations('Common');

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Services', path: '/services' }]} />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <Section tone="light">
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceList.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <Reveal as="div" key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group block h-full">
                  <Card interactive className="flex h-full flex-col">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue/10 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h2 className="mt-5 text-xl font-semibold text-ink">{s.title}</h2>
                    <p className="mt-2 flex-1 text-ink-muted">{s.promise}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
                      {t('viewService')}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" aria-hidden />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </RevealGroup>
      </Section>

      <Section tone="cloud" className="text-center">
        <h2 className="mx-auto max-w-xl text-h3">{t('ctaTitle')}</h2>
        <p className="mx-auto mt-3 max-w-lg text-ink-muted">{t('ctaBody')}</p>
        <div className="mt-6 flex justify-center">
          <Button href="/contact" size="lg" analyticsEvent="cta_click" analyticsLabel="services_cta">
            {tc('getQuote')}
          </Button>
        </div>
      </Section>
    </>
  );
}
