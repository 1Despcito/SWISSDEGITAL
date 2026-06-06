import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { LegalDoc } from '@/components/sections/LegalDoc';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'Legal' });
  return buildMetadata({
    locale,
    path: '/legal/privacy',
    title: t('privacy.metaTitle'),
    description: t('privacy.intro'),
    noindex: true,
  });
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <LegalDoc kind="privacy" />;
}
