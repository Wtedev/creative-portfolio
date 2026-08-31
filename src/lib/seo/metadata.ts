import type { Metadata } from 'next';

import { getSiteUrl } from '@/lib/env';
import type { Locale } from '@/types/global';

type BuildMetadataOptions = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  alternateLocales?: Array<{ locale: Locale; path: string }>;
};

export function buildPageMetadata({
  locale,
  title,
  description,
  path,
  ogImage,
  alternateLocales = [],
}: BuildMetadataOptions): Metadata {
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/${locale}${path === '/' ? '' : path}`;

  const languages: Record<string, string> = {
    en: `${siteUrl}/en${path === '/' ? '' : path}`,
    ar: `${siteUrl}/ar${path === '/' ? '' : path}`,
  };

  for (const alt of alternateLocales) {
    languages[alt.locale] = `${siteUrl}/${alt.locale}${alt.path === '/' ? '' : alt.path}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export function buildPersonJsonLd(options: {
  name: string;
  jobTitle: string;
  url: string;
  email?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: options.name,
    jobTitle: options.jobTitle,
    url: options.url,
    email: options.email,
  };
}

export function buildCreativeWorkJsonLd(options: {
  name: string;
  description: string;
  url: string;
  dateCreated?: string;
  creator: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: options.name,
    description: options.description,
    url: options.url,
    dateCreated: options.dateCreated,
    creator: {
      '@type': 'Person',
      name: options.creator,
    },
  };
}

export function getThemeColor(isDark: boolean): string {
  return isDark ? '#111017' : '#F3F1F5';
}
