'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Light/dark toggle. Renders a stable placeholder until mounted (avoids hydration mismatch). */
export function ThemeToggle({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  const classes = cn(
    'inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors',
    tone === 'light'
      ? 'text-white/80 hover:bg-white/10 hover:text-white'
      : 'text-ink/70 hover:bg-ink/5 hover:text-ink',
  );

  if (!mounted) {
    return <span className={classes} aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={classes}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
