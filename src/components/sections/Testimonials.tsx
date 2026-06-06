'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Avatar } from '@/components/ui/Avatar';
import { testimonials } from '@/content/testimonials';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const t = useTranslations('Home.testimonials');
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const active = testimonials[index]!;

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  return (
    <Section tone="light">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <h2 className="mt-4 text-h2">{t('title')}</h2>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <figure className="relative rounded-3xl border border-line/[0.06] bg-surface p-8 text-center shadow-soft sm:p-12">
          <Quote className="mx-auto h-8 w-8 text-blue/30" aria-hidden />
          <blockquote className="mt-4 text-xl font-medium leading-relaxed text-ink sm:text-2xl">
            “{active.quote}”
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center gap-3">
            <Avatar initials={active.initials} photo={active.photo} name={active.author} size={44} />
            <div className="text-start">
              <p className="font-semibold text-ink">{active.author}</p>
              <p className="text-sm text-ink-muted">
                {active.role}, {active.company}
              </p>
            </div>
          </figcaption>
        </figure>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/10 text-ink transition-colors hover:bg-surface"
          >
            <ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden />
          </button>
          <div className="flex gap-2">
            {testimonials.map((tm, i) => (
              <button
                key={tm.id}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === index ? 'w-6 bg-blue' : 'w-2 bg-ink/20 hover:bg-ink/40',
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/10 text-ink transition-colors hover:bg-surface"
          >
            <ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
          </button>
        </div>
      </div>
    </Section>
  );
}
