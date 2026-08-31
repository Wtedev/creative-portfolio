import { isPublishedStatus } from '@/lib/content/validation';
import { getLocalizedValue } from '@/lib/utilities/locale';
import {
  FACET_ACCENTS,
  MAX_DECORATIVE_SHEETS,
  MAX_HERO_FRAGMENTS,
  type HeroDecorativeSheet,
  type HeroProjectFragment,
} from '@/lib/motion/folder-layout';
import type { Locale } from '@/types/global';
import type { ProjectSummary } from '@/types/project';

export type HeroFolderContent = {
  projects: HeroProjectFragment[];
  decorativeSheets: HeroDecorativeSheet[];
};

/**
 * Build Hero folder content from unique published projects only.
 * One project → one interactive card; optional decorative sheets for depth.
 */
export function buildHeroFolderContent(
  projects: ProjectSummary[],
  locale: Locale,
  maxProjects = MAX_HERO_FRAGMENTS,
): HeroFolderContent {
  const published = dedupePublishedProjects(projects).slice(0, maxProjects);
  if (published.length === 0) {
    return { projects: [], decorativeSheets: [] };
  }

  if (published.length === 1) {
    const decorativeCount = Math.min(MAX_DECORATIVE_SHEETS, 2);
    const decorativeSheets: HeroDecorativeSheet[] = Array.from(
      { length: decorativeCount },
      (_, index) => ({
        id: `decorative-${index}`,
        index,
        accentColor: FACET_ACCENTS[index % FACET_ACCENTS.length]!,
      }),
    );
    const projects = [toFragment(published[0]!, locale, decorativeCount)];
    return { projects, decorativeSheets };
  }

  return {
    projects: published.map((project, index) => toFragment(project, locale, index)),
    decorativeSheets: [],
  };
}

/** @deprecated Use buildHeroFolderContent */
export function buildHeroFragments(
  projects: ProjectSummary[],
  locale: Locale,
): HeroProjectFragment[] {
  return buildHeroFolderContent(projects, locale).projects;
}

function toFragment(project: ProjectSummary, locale: Locale, index: number): HeroProjectFragment {
  return {
    id: project._id,
    slug: project.slug,
    title: getLocalizedValue(project.title, locale),
    category: project.categories[0],
    cover: project.cover,
    coverAlt: getLocalizedValue(project.coverAlt, locale),
    accentColor: project.accentColor ?? FACET_ACCENTS[index % FACET_ACCENTS.length],
    index,
  };
}

function dedupePublishedProjects(projects: ProjectSummary[]): ProjectSummary[] {
  const seen = new Set<string>();
  return filterPublishedSummaries(projects).filter((project) => {
    if (seen.has(project.slug)) return false;
    seen.add(project.slug);
    return true;
  });
}

export function filterPublishedSummaries(projects: ProjectSummary[]): ProjectSummary[] {
  return projects.filter((project) => isPublishedStatus(project.status));
}
