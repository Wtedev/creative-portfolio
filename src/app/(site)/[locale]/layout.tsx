import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { SkipLink } from '@/components/accessibility/skip-link';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/navigation/site-header';
import { ClientMotionShell } from '@/components/motion/client-motion-shell';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { localeDirections } from '@/i18n/config';
import { routing } from '@/i18n/routing';
import { getPortfolioContent } from '@/lib/content/provider';
import { ibmPlexArabic, manrope } from '@/lib/fonts';
import { getThemeColor } from '@/lib/seo/metadata';

import '../../globals.css';

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const tMeta = await getTranslations('meta');
  const { siteSettings } = await getPortfolioContent();
  const direction = localeDirections[locale];
  const brandTitle = tMeta('siteTitle');

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${manrope.variable} ${ibmPlexArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="theme-color"
          content={getThemeColor(true)}
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="theme-color"
          content={getThemeColor(false)}
          media="(prefers-color-scheme: light)"
        />
      </head>
      <body data-locale={locale} suppressHydrationWarning>
        <ThemeProvider defaultTheme={siteSettings.defaultTheme}>
          <NextIntlClientProvider messages={messages}>
            <ClientMotionShell>
              <SkipLink />
              <SiteHeader siteTitle={brandTitle} />
              {children}
              <SiteFooter settings={siteSettings} />
            </ClientMotionShell>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
