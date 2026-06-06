'use client';

import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';

/** Fires `scroll_75` once when the visitor reaches 75% of a key page. */
export function ScrollDepth({ page }: { page: string }) {
  const fired = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (fired.current) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= 0.75) {
        fired.current = true;
        track('scroll_75', { page });
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [page]);

  return null;
}
