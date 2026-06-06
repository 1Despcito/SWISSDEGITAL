import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/lib/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PricingTable } from '@/components/sections/PricingTable';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'Pricing' });
  return buildMetadata({ locale, path: '/pricing', title: t('metaTitle'), description: t('metaDescription') });
}

export default function PricingPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <PricingContent />;
}

function PricingContent() {
  const t = useTranslations('Pricing');
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Pricing', path: '/pricing' }]} />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <Section tone="light" className="text-center">
        <PricingTable />
      </Section>

      <Section tone="cloud" className="text-center">
        <h2 className="mx-auto max-w-xl text-h3">{t('customTitle')}</h2>
        <p className="mx-auto mt-3 max-w-lg text-ink-muted">{t('customBody')}</p>
        <div className="mt-6 flex justify-center">
          <Button href="/contact" size="lg" analyticsEvent="cta_click" analyticsLabel="pricing_custom">
            {t('customCta')}
          </Button>
        </div>
      </Section>
    </>
  );
}
