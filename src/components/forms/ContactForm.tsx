'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { contactFormSchema, type ContactFormValues, budgetValues } from '@/lib/schemas';
import { serviceList } from '@/content/services';
import { locales, localeLabels } from '@/lib/i18n/routing';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type Props = {
  defaultService?: string;
  defaultPackage?: string;
};

const fieldBase =
  'h-12 w-full rounded-xl border border-line/10 bg-card px-4 text-sm text-ink placeholder:text-ink-muted/60 transition-colors focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20';

export function ContactForm({ defaultService, defaultPackage }: Props) {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      service: (defaultService as ContactFormValues['service']) ?? '',
      package: defaultPackage ?? '',
      language: locale,
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, intent: 'lead' }),
      });
      if (!res.ok) throw new Error('failed');
      track('lead_submit', { service: values.service || 'none', package: values.package || 'none' });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  function err(key: keyof ContactFormValues) {
    const message = errors[key]?.message;
    return message ? t(`form.${message}`) : undefined;
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-blue/20 bg-blue/5 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-blue" aria-hidden />
        <h3 className="text-h3">{t('form.successTitle')}</h3>
        <p className="text-ink-muted">{t('form.successBody')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot — visually hidden, must stay empty */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="website">Leave this empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('form.name')} error={err('name')} required>
          <input className={fieldBase} placeholder={t('form.namePlaceholder')} {...register('name')} />
        </Field>
        <Field label={t('form.email')} error={err('email')} required>
          <input
            type="email"
            className={fieldBase}
            placeholder={t('form.emailPlaceholder')}
            {...register('email')}
          />
        </Field>
      </div>

      <Field label={t('form.company')} error={err('company')}>
        <input className={fieldBase} placeholder={t('form.companyPlaceholder')} {...register('company')} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('form.service')} error={err('service')}>
          <select className={cn(fieldBase, 'appearance-none')} {...register('service')}>
            <option value="">{t('form.servicePlaceholder')}</option>
            {serviceList.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t('form.budget')} error={err('budget')}>
          <select className={cn(fieldBase, 'appearance-none')} {...register('budget')}>
            <option value="">{t('form.budgetPlaceholder')}</option>
            {budgetValues.map((b) => (
              <option key={b} value={b}>
                {t(`budgets.${b}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t('form.language')} error={err('language')}>
        <select className={cn(fieldBase, 'appearance-none')} {...register('language')}>
          {locales.map((l) => (
            <option key={l} value={l}>
              {localeLabels[l].native}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t('form.message')} error={err('message')} required>
        <textarea
          rows={5}
          className={cn(fieldBase, 'h-auto py-3')}
          placeholder={t('form.messagePlaceholder')}
          {...register('message')}
        />
      </Field>

      {/* Pre-filled package, if any */}
      <input type="hidden" {...register('package')} />

      {status === 'error' && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            <strong>{t('form.errorTitle')}</strong> — {t('form.errorBody')}
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue px-6 font-medium text-white transition-all hover:bg-blue-600 hover:shadow-glow disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> {t('form.submitting')}
          </>
        ) : (
          t('form.submit')
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-blue"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
