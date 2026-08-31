import { Fraunces, IBM_Plex_Sans_Arabic, Manrope } from 'next/font/google';

export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
});

/** Editorial italic for English Hero title only — OFL via Google Fonts. */
export const frauncesItalic = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['italic'],
  weight: ['500'],
  adjustFontFallback: true,
});

export const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-ibm-plex-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
});
