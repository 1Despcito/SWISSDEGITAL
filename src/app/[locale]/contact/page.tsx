import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { MapPin, Mail } from 'lucide-react';
import type { Locale } from '@/lib/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { ContactForm } from '@/components/forms/ContactForm';
import { BookingEmbed } from '@/components/forms/BookingEmbed';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return buildMetadata({ locale, path: '/contact', title: t('metaTitle'), description: t('metaDescription') });
}

export default function ContactPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  setRequestLocale(params.locale);
  const pick = (v: string | string[] | undefined) => (typeof v === 'string' ? v : undefined);
  return (
    <ContactContent
      defaultService={pick(searchParams.service)}
      defaultPackage={pick(searchParams.package)}
    />
  );
}

function ContactContent({
  defaultService,
  defaultPackage,
}: {
  defaultService?: string;
  defaultPackage?: string;
}) {
  const t = useTranslations('Contact');

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Contact', path: '/contact' }]} />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <div>
            <h2 className="text-h3">{t('formTitle')}</h2>
            <div className="mt-6">
              <ContactForm defaultService={defaultService} defaultPackage={defaultPackage} />
            </div>
          </div>

          {/* Booking + office */}
          <div className="space-y-8">
            <div>
              <h2 className="text-h3">{t('bookingTitle')}</h2>
              <p className="mt-2 text-ink-muted">{t('bookingBody')}</p>
              <div className="mt-6">
                <BookingEmbed />
              </div>
            </div>

            <div className="rounded-2xl border border-line/[0.06] bg-surface p-6">
              <ul className="space-y-4 text-ink">
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue" aria-hidden />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-ink-muted">{t('office')}</span>
                    {t('officeValue')}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue" aria-hidden />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-ink-muted">{t('emailLabel')}</span>
                    <a href="mailto:hello@swissdigiai.ch" className="hover:text-blue">
                      hello@swissdigiai.ch
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
