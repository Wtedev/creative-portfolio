import { isPublishedStatus, sortProjectsByOrder } from '@/lib/content/validation';
import type { Project, ProjectSummary } from '@/types/project';

export function getPublishedProjectList<
  T extends Pick<Project, 'status' | 'order' | 'year' | 'title'>,
>(projects: T[]): T[] {
  return sortProjectsByOrder(projects.filter((project) => isPublishedStatus(project.status)));
}

export function getNextPublishedProject<
  T extends Pick<Project, 'slug' | 'status' | 'order' | 'year' | 'title'>,
>(projects: T[], currentSlug: string): T | null {
  const published = getPublishedProjectList(projects);
  if (published.length === 0) return null;

  const currentIndex = published.findIndex((project) => project.slug === currentSlug);
  if (currentIndex === -1) return published[0] ?? null;

  return published[(currentIndex + 1) % published.length] ?? null;
}

export function toProjectSummary(project: Project): ProjectSummary {
  return {
    _id: project._id,
    title: project.title,
    slug: project.slug,
    client: project.client,
    year: project.year,
    role: project.role,
    categories: project.categories,
    shortDescription: project.shortDescription,
    cover: project.cover,
    coverAlt: project.coverAlt,
    cardSize: project.cardSize,
    accentColor: project.accentColor,
    featured: project.featured,
    order: project.order,
    status: project.status,
  };
}
