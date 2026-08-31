import { SINGLETON_IDS } from '@/sanity/constants/singletons';
import { getSanityClient, getSanityPreviewClient } from '@/sanity/client';
import {
  aboutQuery,
  capabilitiesQuery,
  contactQuery,
  featuredProjectsQuery,
  homepageProjectsQuery,
  previewProjectBySlugQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  publishedProjectsQuery,
  siteSettingsQuery,
  sitemapProjectsQuery,
  toolsQuery,
} from '@/sanity/queries/fragments';
import {
  mapSanityAbout,
  mapSanityCapability,
  mapSanityContact,
  mapSanityProject,
  mapSanityProjects,
  mapSanitySiteSettings,
  mapSanityTool,
} from '@/sanity/adapters/map-content';
import type { PortfolioContent } from '@/types/content';
import type { Project, SitemapProjectEntry } from '@/types/project';

async function getClient(preview = false) {
  return preview ? getSanityPreviewClient() : getSanityClient();
}

export async function fetchPortfolioContent(preview = false): Promise<PortfolioContent> {
  const client = await getClient(preview);

  const [siteSettingsRaw, aboutRaw, contactRaw, capabilitiesRaw, toolsRaw, projectsRaw] =
    await Promise.all([
      client.fetch(siteSettingsQuery, { id: SINGLETON_IDS.siteSettings }),
      client.fetch(aboutQuery, { id: SINGLETON_IDS.about }),
      client.fetch(contactQuery, { id: SINGLETON_IDS.contactAvailability }),
      client.fetch(capabilitiesQuery),
      client.fetch(toolsQuery),
      client.fetch(homepageProjectsQuery),
    ]);

  return {
    siteSettings: mapSanitySiteSettings(siteSettingsRaw ?? {}),
    about: mapSanityAbout(aboutRaw ?? {}),
    contact: mapSanityContact(contactRaw ?? {}),
    capabilities: (capabilitiesRaw ?? []).map(mapSanityCapability),
    tools: (toolsRaw ?? []).map(mapSanityTool),
    projects: mapSanityProjects(projectsRaw ?? []),
  };
}

export async function fetchFeaturedProjects(preview = false) {
  const client = await getClient(preview);
  const raw = await client.fetch(featuredProjectsQuery);
  return mapSanityProjects(raw ?? []);
}

export async function fetchProjectSlugs(): Promise<string[]> {
  const client = getSanityClient();
  const raw: Array<{ slug?: string }> = await client.fetch(projectSlugsQuery);
  return raw.map((entry) => entry.slug).filter((slug): slug is string => Boolean(slug));
}

export async function fetchProjectBySlug(slug: string, preview = false): Promise<Project | null> {
  const client = await getClient(preview);
  const query = preview ? previewProjectBySlugQuery : projectBySlugQuery;
  const raw = await client.fetch(query, { slug });
  if (!raw) return null;
  return mapSanityProject(raw);
}

export async function fetchPublishedProjects(preview = false): Promise<Project[]> {
  const client = await getClient(preview);
  const raw = await client.fetch(publishedProjectsQuery);
  return (raw ?? []).map(mapSanityProject);
}

export async function fetchSitemapProjects(): Promise<SitemapProjectEntry[]> {
  const client = getSanityClient();
  const raw: Array<{ slug?: string; _updatedAt?: string }> =
    await client.fetch(sitemapProjectsQuery);
  return raw
    .filter((entry) => Boolean(entry.slug))
    .map((entry) => ({ slug: entry.slug!, _updatedAt: entry._updatedAt }));
}
