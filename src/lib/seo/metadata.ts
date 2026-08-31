import type { Metadata } from 'next';

import { getSiteUrl } from '@/lib/env';
import { buildAbsoluteUrl, buildLanguageAlternates, resolveAbsoluteUrl } from '@/lib/seo/urls';
import type { Locale } from '@/types/global';

type BuildMetadataOptions = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  alternateLocales?: Array<{ locale: Locale; path: string }>;
  noIndex?: boolean;
};

export function buildPageMetadata({
  locale,
  title,
  description,
  path,
  ogImage,
  alternateLocales = [],
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const canonical = buildAbsoluteUrl(locale, path);
  const languages = { ...buildLanguageAlternates(path) };

  for (const alt of alternateLocales) {
    languages[alt.locale] = buildAbsoluteUrl(alt.locale, alt.path);
  }

  const resolvedOgImage = resolveAbsoluteUrl(ogImage);
  const robots = noIndex ? { index: false as const, follow: false as const } : undefined;

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    robots,
    openGraph: {
      title,
      description,
      url: canonical,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
      images: resolvedOgImage ? [{ url: resolvedOgImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: resolvedOgImage ? [resolvedOgImage] : undefined,
    },
  };
}

export function buildPersonJsonLd(options: {
  name: string;
  jobTitle: string;
  url: string;
  email?: string;
}) {
  const json: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: options.name,
    jobTitle: options.jobTitle,
    url: options.url,
  };

  if (options.email) {
    json.email = options.email;
  }

  return json;
}

export function buildCreativeWorkJsonLd(options: {
  name: string;
  description: string;
  url: string;
  dateCreated?: string;
  creator: string;
}) {
  const json: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: options.name,
    description: options.description,
    url: options.url,
    creator: {
      '@type': 'Person',
      name: options.creator,
    },
  };

  if (options.dateCreated) {
    json.dateCreated = options.dateCreated;
  }

  return json;
}

export function buildWebsiteJsonLd(options: { name: string; url: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: options.name,
    url: options.url,
    description: options.description,
  };
}

export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function getThemeColor(isDark: boolean): string {
  return isDark ? '#111017' : '#F3F1F5';
}
