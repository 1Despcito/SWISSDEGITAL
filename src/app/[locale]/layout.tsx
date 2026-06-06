import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, dirFor, type Locale } from '@/lib/i18n/routing';
import { poppins, cairo } from '@/lib/fonts';
import { buildMetadata } from '@/lib/seo';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { Analytics } from '@/components/analytics/Analytics';
import { SiteJsonLd } from '@/components/seo/JsonLd';
import '@/styles/globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  return buildMetadata({
    locale,
    path: '',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!routing.locales.includes(locale as Locale)) notFound();

  // Enable static rendering for this locale.
  setRequestLocale(locale);

  const dir = dirFor(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${poppins.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-bg text-ink">
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SiteJsonLd locale={locale as Locale} />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-blue focus:px-4 focus:py-2 focus:text-sm focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <ChatWidget />
          <CookieBanner />
          <Analytics />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
