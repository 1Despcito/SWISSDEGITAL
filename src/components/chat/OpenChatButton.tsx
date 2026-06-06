'use client';

import { Sparkles } from 'lucide-react';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

/** CTA that opens the global ChatWidget via a window event. */
export function OpenChatButton({
  label,
  className,
  variant = 'light',
}: {
  label: string;
  className?: string;
  variant?: 'light' | 'dark';
}) {
  return (
    <button
      type="button"
      onClick={() => {
        track('cta_click', { label: 'talk_to_ai' });
        window.dispatchEvent(new Event('sda-open-chat'));
      }}
      className={cn(
        'inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-medium transition-all hover:-translate-y-0.5',
        variant === 'light'
          ? 'bg-white/10 text-white ring-1 ring-inset ring-white/25 backdrop-blur hover:bg-white/15'
          : 'bg-blue text-white hover:bg-blue-600 hover:shadow-glow',
        className,
      )}
    >
      <Sparkles className="h-4 w-4 text-cyan" aria-hidden />
      {label}
    </button>
  );
}
