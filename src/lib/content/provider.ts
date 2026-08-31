import { fallbackAbout } from '@/content/fallback/about';
import { fallbackCapabilities } from '@/content/fallback/capabilities';
import { fallbackContact } from '@/content/fallback/contact';
import { fallbackProjects, fallbackProjectSummaries } from '@/content/fallback/projects';
import { fallbackSiteSettings } from '@/content/fallback/site-settings';
import { fallbackTools } from '@/content/fallback/tools';
import { isSanityConfigured } from '@/lib/env';
import { isPublishedStatus } from '@/lib/content/validation';
import type {
  PortfolioContent,
  PortfolioContentResult,
  ProjectContentResult,
  ProjectDetailContent,
} from '@/types/content';
import type { Project } from '@/types/project';

const fallbackPortfolioContent: PortfolioContent = {
  siteSettings: fallbackSiteSettings,
  about: fallbackAbout,
  contact: fallbackContact,
  capabilities: fallbackCapabilities,
  tools: fallbackTools,
  projects: fallbackProjectSummaries.filter((project) => isPublishedStatus(project.status)),
};

function logSanityError(error: unknown) {
  if (process.env.NODE_ENV === 'development') {
    console.error('[content-provider] Sanity fetch failed:', error);
  }
}

export function getContentSource(): 'sanity' | 'fallback' {
  return isSanityConfigured() ? 'sanity' : 'fallback';
}

export async function getPortfolioContent(options?: {
  preview?: boolean;
}): Promise<PortfolioContentResult> {
  if (!isSanityConfigured()) {
    return {
      ...fallbackPortfolioContent,
      source: 'fallback',
      error: 'not-configured',
    };
  }

  try {
    const { fetchPortfolioContent } = await import('@/sanity/queries/portfolio');
    const content = await fetchPortfolioContent(options?.preview ?? false);
    return { ...content, source: 'sanity' };
  } catch (error) {
    logSanityError(error);
    return {
      ...fallbackPortfolioContent,
      source: 'fallback',
      error: 'unavailable',
    };
  }
}

export async function getProjectBySlug(
  slug: string,
  options?: { preview?: boolean },
): Promise<ProjectContentResult> {
  if (!isSanityConfigured()) {
    const project =
      fallbackProjects.find(
        (entry) => entry.slug === slug && (options?.preview || isPublishedStatus(entry.status)),
      ) ?? null;

    return {
      project,
      meta: { source: 'fallback', error: 'not-configured' },
    };
  }

  try {
    const { fetchProjectBySlug } = await import('@/sanity/queries/projects');
    const project = await fetchProjectBySlug(slug, options?.preview ?? false);
    return { project, meta: { source: 'sanity' } };
  } catch (error) {
    logSanityError(error);

    if (options?.preview) {
      return { project: null, meta: { source: 'sanity', error: 'unavailable' } };
    }

    const project = fallbackProjects.find(
      (entry) => entry.slug === slug && isPublishedStatus(entry.status),
    );

    return {
      project: project ?? null,
      meta: { source: 'fallback', error: 'unavailable' },
    };
  }
}

export async function getProjectDetail(
  slug: string,
  options?: { preview?: boolean },
): Promise<ProjectDetailContent | null> {
  const [projectResult, portfolio] = await Promise.all([
    getProjectBySlug(slug, options),
    getPortfolioContent(options),
  ]);
  const { project } = projectResult;

  if (!project) return null;

  if (!options?.preview && !isPublishedStatus(project.status)) {
    return null;
  }

  return {
    project,
    siteSettings: portfolio.siteSettings,
    contact: portfolio.contact,
  };
}

export async function getPublishedProjects(options?: { preview?: boolean }): Promise<Project[]> {
  if (!isSanityConfigured()) {
    return fallbackProjects.filter((project) => isPublishedStatus(project.status));
  }

  try {
    const { fetchPublishedProjects } = await import('@/sanity/queries/projects');
    return await fetchPublishedProjects(options?.preview ?? false);
  } catch (error) {
    logSanityError(error);
    return fallbackProjects.filter((project) => isPublishedStatus(project.status));
  }
}

export function getFallbackPortfolioContent(): PortfolioContent {
  return fallbackPortfolioContent;
}
