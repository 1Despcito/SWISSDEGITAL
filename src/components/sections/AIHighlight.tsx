import { useTranslations } from 'next-intl';
import { BrainCircuit } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { OpenChatButton } from '@/components/chat/OpenChatButton';

export function AIHighlight() {
  const t = useTranslations('Home.aiHighlight');

  return (
    <Section tone="gradient" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 start-[-8%] h-96 w-96 rounded-full bg-blue/30 blur-3xl"
      />
      <div className="relative grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Eyebrow tone="dark">{t('eyebrow')}</Eyebrow>
          <h2 className="mt-4 text-h2 text-white">{t('title')}</h2>
          <p className="mt-4 max-w-2xl text-body-lg text-white/75">{t('body')}</p>
          <div className="mt-8">
            <OpenChatButton label={t('cta')} variant="dark" />
          </div>
        </div>
        <div className="hidden justify-center lg:col-span-4 lg:flex">
          <span className="inline-flex h-32 w-32 items-center justify-center rounded-3xl bg-white/5 ring-1 ring-white/15 backdrop-blur">
            <BrainCircuit className="h-16 w-16 text-cyan" aria-hidden />
          </span>
        </div>
      </div>
    </Section>
  );
}
