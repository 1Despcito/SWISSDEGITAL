import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
import type { Locale } from '@/lib/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { CaseThumb } from '@/components/ui/CaseThumb';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { caseStudies, getCaseStudy } from '@/content/work';

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  const item = getCaseStudy(slug);
  if (!item) return {};
  return buildMetadata({
    locale,
    path: `/work/${slug}`,
    title: `${item.client} — SwissDigiAI`,
    description: item.summary,
  });
}

export default function CaseStudyPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  setRequestLocale(locale);
  const item = getCaseStudy(slug);
  if (!item) notFound();
  return <CaseStudyContent slug={slug} />;
}

function CaseStudyContent({ slug }: { slug: string }) {
  const t = useTranslations('Work');
  const tc = useTranslations('Common');
  const item = getCaseStudy(slug)!;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Work', path: '/work' },
          { name: item.client, path: `/work/${slug}` },
        ]}
      />

      <section className="border-b border-line/[0.06] bg-surface pt-28 lg:pt-36">
        <Container className="pb-12 lg:pb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue">{item.categoryLabel}</p>
          <h1 className="mt-3 max-w-3xl text-h1">{item.client}</h1>
          <p className="mt-4 max-w-2xl text-body-lg text-ink-muted">{item.summary}</p>
        </Container>
        <Container className="pb-12">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl">
            <CaseThumb accent={item.accent} image={item.image} label={item.client} priority />
          </div>
        </Container>
      </section>

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <div>
              <Eyebrow>{t('challenge')}</Eyebrow>
              <p className="mt-4 text-body-lg text-ink-muted">{item.challenge}</p>
            </div>
            <div>
              <Eyebrow>{t('solution')}</Eyebrow>
              <p className="mt-4 text-body-lg text-ink-muted">{item.solution}</p>
            </div>
            {item.quote && (
              <figure className="rounded-2xl bg-surface p-8">
                <Quote className="h-7 w-7 text-blue/30" aria-hidden />
                <blockquote className="mt-3 text-xl font-medium text-ink">“{item.quote.text}”</blockquote>
                <figcaption className="mt-3 text-sm text-ink-muted">
                  {item.quote.author} — {item.quote.role}
                </figcaption>
              </figure>
            )}
          </div>

          <aside className="space-y-8">
            <div>
              <Eyebrow>{t('results')}</Eyebrow>
              <div className="mt-4 space-y-4">
                {item.results.map((r) => (
                  <div key={r.label} className="rounded-xl border border-line/[0.06] bg-card p-4 shadow-soft">
                    <p className="text-3xl font-semibold text-ink">{r.value}</p>
                    <p className="text-sm text-ink-muted">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Eyebrow>{t('techUsed')}</Eyebrow>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tech.map((tech) => (
                  <span key={tech} className="rounded-full bg-surface px-3 py-1.5 text-sm text-ink">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="cloud" className="text-center">
        <h2 className="mx-auto max-w-xl text-h2">{t('ctaTitle')}</h2>
        <p className="mx-auto mt-3 max-w-lg text-ink-muted">{t('ctaBody')}</p>
        <div className="mt-6 flex justify-center">
          <Button href="/contact" size="lg" analyticsEvent="cta_click" analyticsLabel={`work_${slug}_cta`}>
            {tc('startProject')}
          </Button>
        </div>
      </Section>
    </>
  );
}
