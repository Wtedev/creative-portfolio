import { isPublishedStatus } from '@/lib/content/validation';
import { formatYear, getLocalizedValue } from '@/lib/utilities/locale';
import {
  FACET_ACCENTS,
  MAX_HERO_FRAGMENTS,
  type HeroProjectFragment,
} from '@/lib/motion/folder-layout';
import type { Locale } from '@/types/global';
import type { ProjectSummary } from '@/types/project';

const FACET_KEYS = ['idea', 'direction', 'system', 'experience'] as const;

type FacetLabels = Record<(typeof FACET_KEYS)[number], string>;

/**
 * Build a deterministic Hero fragment list from published project summaries.
 * With fewer than MAX projects, supplements with editorial facet sheets of the
 * first project (same slug) — not fabricated separate case studies.
 */
export function buildHeroFragments(
  projects: ProjectSummary[],
  locale: Locale,
  facetLabels: FacetLabels,
  max = MAX_HERO_FRAGMENTS,
): HeroProjectFragment[] {
  const published = filterPublishedSummaries(projects).slice(0, max);
  if (published.length === 0) return [];

  if (published.length >= max) {
    return published.map((project, index) => toFragment(project, locale, index));
  }

  const fragments: HeroProjectFragment[] = published.map((project, index) =>
    toFragment(project, locale, index),
  );

  const seed = published[0]!;
  let nextIndex = fragments.length;

  while (fragments.length < max) {
    const facetKey = FACET_KEYS[nextIndex % FACET_KEYS.length]!;
    fragments.push({
      id: `${seed._id}-facet-${facetKey}-${nextIndex}`,
      slug: seed.slug,
      title: getLocalizedValue(seed.title, locale),
      category: seed.categories[0] ?? seed.client,
      year: formatYear(seed.year, locale),
      cover: seed.cover,
      coverAlt: getLocalizedValue(seed.coverAlt, locale),
      accentColor: FACET_ACCENTS[nextIndex % FACET_ACCENTS.length],
      facetLabel: facetLabels[facetKey],
      index: nextIndex,
    });
    nextIndex += 1;
  }

  return fragments;
}

function toFragment(project: ProjectSummary, locale: Locale, index: number): HeroProjectFragment {
  return {
    id: project._id,
    slug: project.slug,
    title: getLocalizedValue(project.title, locale),
    category: project.categories[0] ?? project.client,
    year: formatYear(project.year, locale),
    cover: project.cover,
    coverAlt: getLocalizedValue(project.coverAlt, locale),
    accentColor: project.accentColor ?? FACET_ACCENTS[index % FACET_ACCENTS.length],
    index,
  };
}

export function filterPublishedSummaries(projects: ProjectSummary[]): ProjectSummary[] {
  return projects.filter((project) => isPublishedStatus(project.status));
}
