import type { MetadataRoute } from 'next';

import { getPublishedProjects } from '@/lib/content/provider';
import { getSiteUrl } from '@/lib/env';
import { routing } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const projects = await getPublishedProjects();

  const homeEntries = routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((altLocale) => [altLocale, `${siteUrl}/${altLocale}`]),
      ),
    },
  }));

  const projectEntries = projects.flatMap((project) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}/project/${project.slug}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((altLocale) => [
            altLocale,
            `${siteUrl}/${altLocale}/project/${project.slug}`,
          ]),
        ),
      },
    })),
  );

  return [...homeEntries, ...projectEntries];
}
