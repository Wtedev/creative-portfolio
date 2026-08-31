import { routing } from '@/i18n/routing';
import { getSiteUrl } from '@/lib/env';
import type { Locale } from '@/types/global';

export function normalizeSiteOrigin(url: string): string {
  return url.replace(/\/$/, '');
}

export function buildLocalizedPath(locale: Locale, path = '/'): string {
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function buildAbsoluteUrl(locale: Locale, path = '/'): string {
  return `${normalizeSiteOrigin(getSiteUrl())}${buildLocalizedPath(locale, path)}`;
}

export function resolveAbsoluteUrl(value?: string): string | undefined {
  if (!value) return undefined;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  const origin = normalizeSiteOrigin(getSiteUrl());
  return `${origin}${value.startsWith('/') ? value : `/${value}`}`;
}

export function buildLanguageAlternates(path = '/'): Record<string, string> {
  const origin = normalizeSiteOrigin(getSiteUrl());
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;

  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${origin}/${locale}${normalized}`]),
  ) as Record<string, string>;

  languages['x-default'] = `${origin}/${routing.defaultLocale}${normalized}`;

  return languages;
}

export function isSafeInternalRedirect(path: string, locale: Locale): boolean {
  if (!path.startsWith('/') || path.startsWith('//')) return false;
  if (path.includes('://') || path.includes('\\')) return false;
  return new RegExp(`^/(${routing.locales.join('|')})(/|$)`).test(path) || path === `/${locale}`;
}

export function sanitizeInternalRedirect(
  path: string | null,
  locale: Locale,
  fallback: string,
): string {
  if (!path || !isSafeInternalRedirect(path, locale)) {
    return fallback;
  }
  return path;
}

export function isProductionSiteUrl(): boolean {
  const url = getSiteUrl();
  if (!url.startsWith('http')) return false;
  try {
    const { hostname } = new URL(url);
    return hostname !== 'localhost' && hostname !== '127.0.0.1';
  } catch {
    return false;
  }
}
