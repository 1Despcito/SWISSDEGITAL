'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/** Fires `service_view` once when a service detail page mounts. */
export function ServiceView({ slug }: { slug: string }) {
  useEffect(() => {
    track('service_view', { slug });
  }, [slug]);
  return null;
}
