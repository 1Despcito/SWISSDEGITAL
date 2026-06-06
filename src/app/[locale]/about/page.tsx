import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/lib/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { getIcon, type IconKey } from '@/lib/icons';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { team } from '@/content/team';

const VALUES: { key: string; icon: IconKey }[] = [
  { key: 'craft', icon: 'sparkles' },
  { key: 'speed', icon: 'rocket' },
  { key: 'trust', icon: 'shield' },
  { key: 'privacy', icon: 'shield' },
];

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return buildMetadata({ locale, path: '/about', title: t('metaTitle'), description: t('metaDescription') });
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations('About');
  const tc = useTranslations('Common');

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'About', path: '/about' }]} />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('intro')} />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>{t('missionTitle')}</Eyebrow>
            <p className="mt-4 text-body-lg text-ink-muted">{t('missionBody')}</p>
          </div>
          <div>
            <Eyebrow>{t('whyTitle')}</Eyebrow>
            <p className="mt-4 text-body-lg text-ink-muted">{t('whyBody')}</p>
          </div>
        </div>
      </Section>

      <Section tone="cloud">
        <Eyebrow>{t('valuesTitle')}</Eyebrow>
        <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ key, icon }) => {
            const Icon = getIcon(icon);
            return (
              <Reveal as="div" key={key} className="rounded-2xl bg-card p-6 shadow-soft">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue/10 text-blue">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{t(`values.${key}.title`)}</h3>
                <p className="mt-2 text-sm text-ink-muted">{t(`values.${key}.body`)}</p>
              </Reveal>
            );
          })}
        </RevealGroup>
      </Section>

      <Section tone="light">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2">{t('teamTitle')}</h2>
          <p className="mt-3 text-ink-muted">{t('teamSubtitle')}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.id} className="rounded-2xl border border-line/[0.06] bg-card p-6 text-center shadow-soft">
              <div className="flex justify-center">
                <Avatar initials={m.initials} photo={m.photo} name={m.name} size={72} className="text-xl" />
              </div>
              <h3 className="mt-4 font-semibold text-ink">{m.name}</h3>
              <p className="text-sm text-blue">{m.role}</p>
              <p className="mt-2 text-sm text-ink-muted">{m.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cloud" className="text-center">
        <h2 className="mx-auto max-w-xl text-h3">{t('ctaTitle')}</h2>
        <p className="mx-auto mt-3 max-w-lg text-ink-muted">{t('ctaBody')}</p>
        <div className="mt-6 flex justify-center">
          <Button href="/contact" size="lg" analyticsEvent="cta_click" analyticsLabel="about_cta">
            {tc('startProject')}
          </Button>
        </div>
      </Section>
    </>
  );
}
