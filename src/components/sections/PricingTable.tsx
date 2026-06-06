'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { packages, type BillingMode } from '@/content/pricing';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export function PricingTable() {
  const t = useTranslations('Pricing');
  const [mode, setMode] = useState<BillingMode>('monthly');

  useEffect(() => {
    track('pricing_view', {});
  }, []);

  return (
    <>
      {/* Billing toggle */}
      <div className="mx-auto mb-10 inline-flex rounded-full border border-line/10 bg-card p-1">
        {(['monthly', 'project'] as BillingMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-colors',
              mode === m ? 'bg-blue text-white' : 'text-ink/70 hover:text-ink',
            )}
          >
            {m === 'monthly' ? t('toggleMonthly') : t('toggleProject')}
          </button>
        ))}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-3">
        {packages.map((pkg) => {
          const price = mode === 'monthly' ? pkg.monthly : pkg.project;
          return (
            <div
              key={pkg.id}
              className={cn(
                'relative flex h-full flex-col rounded-3xl border bg-card p-7 shadow-soft',
                pkg.popular ? 'border-blue ring-2 ring-blue/20 lg:-mt-4 lg:mb-4' : 'border-line/[0.06]',
              )}
            >
              {pkg.popular && (
                <span className="absolute -top-3 start-7 rounded-full bg-blue px-3 py-1 text-xs font-semibold text-white">
                  {t('mostPopular')}
                </span>
              )}
              <h3 className="text-xl font-semibold text-ink">{pkg.name}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{pkg.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1">
                {mode === 'project' && <span className="text-sm text-ink-muted">{t('from')}</span>}
                <span className="text-4xl font-semibold tracking-tight text-ink">
                  CHF {price?.toLocaleString('en-US')}
                </span>
                {mode === 'monthly' && <span className="text-ink-muted">{t('perMonth')}</span>}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                href={`/contact?package=${pkg.id}`}
                variant={pkg.popular ? 'primary' : 'outline'}
                className="mt-7 w-full"
                analyticsEvent="cta_click"
                analyticsLabel={`pricing_${pkg.id}`}
              >
                {t('getStartedWith', { package: pkg.name })}
              </Button>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-ink-muted">{t('vatNote')}</p>
    </>
  );
}
