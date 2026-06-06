import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import { Check, ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/motion/Reveal';
import { WorkCard } from '@/components/sections/WorkCard';
import { ServiceJsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { ScrollDepth } from '@/components/analytics/ScrollDepth';
import { ServiceView } from '@/components/analytics/ServiceView';
import { serviceSlugs, getService } from '@/content/services';
import { caseStudiesBySlugs } from '@/content/work';
import { getIcon } from '@/lib/icons';

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  const service = getService(slug, locale);
  if (!service) return {};
  return buildMetadata({
    locale,
    path: `/services/${slug}`,
    title: `${service.title} — SwissDigiAI`,
    description: service.tagline,
  });
}

export default function ServiceDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  setRequestLocale(locale);
  const service = getService(slug);
  if (!service) notFound();
  return <ServiceDetail slug={slug} />;
}

function ServiceDetail({ slug }: { slug: string }) {
  const t = useTranslations('Services');
  const tc = useTranslations('Common');
  const locale = useLocale();
  const service = getService(slug, locale)!;
  const Icon = getIcon(service.icon);
  const related = caseStudiesBySlugs(service.relatedWork, locale);

  return (
    <>
      <ScrollDepth page={`service:${slug}`} />
      <ServiceView slug={slug} />
      <ServiceJsonLd name={service.title} description={service.promise} path={`/services/${slug}`} />
      <FaqJsonLd items={service.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Services', path: '/services' },
          { name: service.title, path: `/services/${slug}` },
        ]}
      />

      {/* Hero */}
      <section className="border-b border-line/[0.06] bg-surface pt-28 lg:pt-36">
        <Container className="pb-12 lg:pb-16">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue text-white shadow-glow">
            <Icon className="h-7 w-7" aria-hidden />
          </span>
          <h1 className="mt-6 max-w-3xl text-h1">{service.title}</h1>
          <p className="mt-4 max-w-2xl text-body-lg text-ink-muted">{service.promise}</p>
          <div className="mt-8">
            <Button
              href={`/contact?service=${slug}`}
              size="lg"
              analyticsEvent="cta_click"
              analyticsLabel={`service_${slug}_hero`}
            >
              {tc('startProject')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </Button>
          </div>
        </Container>
      </section>

      {/* What's included + deliverables */}
      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>{t('whatYouGet')}</Eyebrow>
            <ul className="mt-6 space-y-3">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue">
                    <Check className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>{t('deliverables')}</Eyebrow>
            <div className="mt-6 grid gap-3">
              {service.deliverables.map((d) => (
                <div key={d} className="rounded-xl border border-line/[0.06] bg-surface px-5 py-4 font-medium text-ink">
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section tone="cloud">
        <Eyebrow>{t('ourProcess')}</Eyebrow>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, i) => (
            <Reveal as="div" key={step.title} delay={i * 0.05} className="rounded-2xl bg-card p-6 shadow-soft">
              <span className="text-sm font-semibold text-blue">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Related work */}
      {related.length > 0 && (
        <Section tone="light">
          <Eyebrow>{t('relatedWork')}</Eyebrow>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <WorkCard key={item.slug} item={item} />
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section tone="cloud">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-h2">{t('faqTitle')}</h2>
          <div className="mt-8">
            <Accordion items={service.faq} />
          </div>
        </div>
      </Section>

      {/* Pricing teaser + CTA */}
      <Section tone="light" className="text-center">
        <p className="mx-auto max-w-xl text-body-lg text-ink-muted">{t('pricingTeaser')}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/pricing" size="lg" variant="outline" analyticsEvent="cta_click" analyticsLabel={`service_${slug}_pricing`}>
            {t('pricingCta')}
          </Button>
          <Button href={`/contact?service=${slug}`} size="lg" analyticsEvent="cta_click" analyticsLabel={`service_${slug}_cta`}>
            {tc('getQuote')}
          </Button>
        </div>
      </Section>
    </>
  );
}
