import type { Metadata } from 'next';
import { poppins } from '@/lib/fonts';
import '@/styles/globals.css';

// Admin area — outside the public [locale] site, its own <html> (root is a
// passthrough). Never indexed.
export const metadata: Metadata = {
  title: 'Dashboard — SwissDigiAI',
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-dvh bg-surface text-ink">{children}</body>
    </html>
  );
}
