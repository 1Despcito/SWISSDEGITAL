import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/lib/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { WorkGrid } from '@/components/sections/WorkGrid';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { ScrollDepth } from '@/components/analytics/ScrollDepth';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'Work' });
  return buildMetadata({ locale, path: '/work', title: t('metaTitle'), description: t('metaDescription') });
}

export default function WorkPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <WorkContent />;
}

function WorkContent() {
  const t = useTranslations('Work');
  return (
    <>
      <ScrollDepth page="work" />
      <BreadcrumbJsonLd items={[{ name: 'Work', path: '/work' }]} />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <Section tone="light">
        <WorkGrid />
      </Section>
    </>
  );
}
