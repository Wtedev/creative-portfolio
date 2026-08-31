import type { Locale } from '@/types/global';

export const locales = ['en', 'ar'] as const satisfies readonly Locale[];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
};

export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
};

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
