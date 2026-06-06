import { Poppins, Cairo } from 'next/font/google';

// UI + headings. Weights per brand guidelines: 300/400/500/600.
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-poppins',
});

// Arabic body/headings (RTL locale).
export const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cairo',
});
