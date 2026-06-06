import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { siteUrl } from '@/lib/utils';

// Base URL for resolving OG/Twitter image + canonical URLs across every route
// (inherited by pages that don't set their own via buildMetadata).
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  icons: { icon: '/icon.svg', shortcut: '/icon.svg', apple: '/icon.svg' },
};

// The real <html>/<body> live in app/[locale]/layout.tsx (locale decides lang+dir).
// This root layout is required by Next.js but only passes children through.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
