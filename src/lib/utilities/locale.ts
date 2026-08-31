import type { Locale, LocalizedString, LocalizedText } from '@/types/global';

export function getLocalizedValue(
  field: LocalizedString | LocalizedText | undefined,
  locale: Locale,
  fallback = '',
): string {
  if (!field) return fallback;
  return field[locale] || field.en || fallback;
}

export function getLocalizedList(
  field: { en: string[]; ar: string[] } | undefined,
  locale: Locale,
): string[] {
  if (!field) return [];
  return field[locale]?.length ? field[locale] : field.en;
}

export function formatYear(year: number, locale: Locale): string {
  const localeTag = locale === 'ar' ? 'ar-SA-u-nu-latn' : 'en-US';
  return new Intl.NumberFormat(localeTag, {
    useGrouping: false,
  }).format(year);
}

export function formatDate(date: Date, locale: Locale): string {
  const localeTag = locale === 'ar' ? 'ar-SA-u-nu-latn' : 'en-US';
  return new Intl.DateTimeFormat(localeTag, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function getOppositeLocale(locale: Locale): Locale {
  return locale === 'en' ? 'ar' : 'en';
}
