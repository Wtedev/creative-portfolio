import { getSiteUrl } from '@/lib/env';

const siteUrl = getSiteUrl();

export const presentationConfig = {
  previewUrl: {
    origin: siteUrl,
    previewMode: {
      enable: '/api/draft-mode/enable',
      disable: '/api/draft-mode/disable',
    },
  },
  allowOrigins: [siteUrl, 'http://localhost:3000'],
};

export const presentationLocations = {
  siteSettings: {
    locations: [
      { title: 'English Homepage', href: `${siteUrl}/en` },
      { title: 'Arabic Homepage', href: `${siteUrl}/ar` },
    ],
  },
  project: {
    select: { slug: 'slug.current' },
    resolve: (doc: { slug?: string }) =>
      doc?.slug
        ? [
            { title: 'English Project', href: `${siteUrl}/en/project/${doc.slug}` },
            { title: 'Arabic Project', href: `${siteUrl}/ar/project/${doc.slug}` },
          ]
        : [],
  },
};
