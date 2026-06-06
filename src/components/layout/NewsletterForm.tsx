'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Check } from 'lucide-react';

export function NewsletterForm() {
  const t = useTranslations('Footer');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === 'loading') return;
    setState('loading');
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent: 'newsletter', email }),
      });
    } catch {
      /* lead is best-effort; still confirm to the user */
    }
    setState('done');
    setEmail('');
  }

  if (state === 'done') {
    return (
      <p className="flex items-center gap-2 text-sm text-cyan">
        <Check className="h-4 w-4" aria-hidden /> {t('newsletterSuccess')}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        {t('newsletterPlaceholder')}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('newsletterPlaceholder')}
        className="h-11 w-full rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus:border-cyan focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === 'loading'}
        aria-label={t('newsletterCta')}
        className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-full bg-blue px-4 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );
}
