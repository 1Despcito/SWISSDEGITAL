import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';

const STEPS = ['discover', 'design', 'build', 'grow'] as const;

export function ProcessTimeline() {
  const t = useTranslations('Home.process');

  return (
    <Section tone="light">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <h2 className="mt-4 text-h2">{t('title')}</h2>
      </div>

      <RevealGroup className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* connecting line on large screens */}
        <div aria-hidden className="absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-blue/30 to-transparent lg:block" />
        {STEPS.map((step, i) => (
          <Reveal as="div" key={step} delay={i * 0.05} className="relative text-center lg:text-start">
            <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue font-semibold text-white shadow-glow">
              {i + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-ink">{t(`steps.${step}.title`)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(`steps.${step}.body`)}</p>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
