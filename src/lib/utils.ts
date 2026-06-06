import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional class names, de-duplicating Tailwind utilities. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Absolute site URL (no trailing slash). Falls back to the production domain. */
export function siteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://swissdigiai.ch';
  return url.replace(/\/$/, '');
}

/** Build an absolute URL for a path. */
export function absoluteUrl(path = ''): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl()}${clean}`;
}
