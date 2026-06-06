import { useTranslations } from 'next-intl';
import { ArrowRight, CalendarClock } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function CTASection() {
  const t = useTranslations('Home.ctaBand');
  const tc = useTranslations('Common');

  return (
    <Section tone="cloud">
      <div className="rounded-3xl bg-hero-gradient px-6 py-14 text-center text-white sm:px-12 sm:py-20">
        <h2 className="mx-auto max-w-2xl text-h2 text-white">{t('title')}</h2>
        <p className="mx-auto mt-4 max-w-xl text-body-lg text-white/75">{t('subtitle')}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/contact" size="lg" analyticsEvent="cta_click" analyticsLabel="ctaband_start">
            {tc('startProject')}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
          </Button>
          <Button
            href="/contact"
            size="lg"
            variant="secondary"
            analyticsEvent="cta_click"
            analyticsLabel="ctaband_book"
          >
            <CalendarClock className="h-4 w-4" aria-hidden />
            {tc('bookCall')}
          </Button>
        </div>
      </div>
    </Section>
  );
}
