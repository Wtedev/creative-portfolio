import type { MetadataRoute } from 'next';

import { getPublishedProjects } from '@/lib/content/provider';
import { buildAbsoluteUrl, buildLanguageAlternates } from '@/lib/seo/urls';
import { routing } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublishedProjects();

  const homeEntries = routing.locales.map((locale) => ({
    url: buildAbsoluteUrl(locale, '/'),
    alternates: {
      languages: buildLanguageAlternates('/'),
    },
  }));

  const projectEntries = projects.flatMap((project) => {
    const path = `/project/${project.slug}`;

    return routing.locales.map((locale) => ({
      url: buildAbsoluteUrl(locale, path),
      alternates: {
        languages: buildLanguageAlternates(path),
      },
    }));
  });

  return [...homeEntries, ...projectEntries];
}
