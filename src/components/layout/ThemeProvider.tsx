'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

/** Class-based theme provider (light/dark/system) with no flash + no transition flicker. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
