'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
};

export function ThemeProvider({ children, defaultTheme = 'system' }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme={defaultTheme}
      enableSystem
      storageKey="portfolio-theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
