import { useTranslations } from 'next-intl';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';

export type LegalKind = 'privacy' | 'imprint' | 'terms';

/** Shared template for the three legal pages. Copy lives in Legal.* messages. */
export function LegalDoc({ kind }: { kind: LegalKind }) {
  const t = useTranslations('Legal');

  return (
    <>
      <PageHero title={t(`${kind}.title`)} />
      <Section tone="light">
        <div className="mx-auto max-w-3xl space-y-6 text-body-lg text-ink-muted">
          <p className="text-sm text-ink-muted">{t('lastUpdated', { date: '2026-06-01' })}</p>
          <p>{t(`${kind}.intro`)}</p>
          <div className="rounded-2xl border border-line/[0.06] bg-surface p-6 text-sm text-ink-muted">
            This is placeholder legal text. Replace it with your reviewed{' '}
            {kind === 'privacy' ? 'privacy policy' : kind === 'imprint' ? 'imprint / company details' : 'terms'}{' '}
            before launch. For questions, contact{' '}
            <a href="mailto:hello@swissdigiai.ch" className="text-blue hover:underline">
              hello@swissdigiai.ch
            </a>
            .
          </div>
        </div>
      </Section>
    </>
  );
}
