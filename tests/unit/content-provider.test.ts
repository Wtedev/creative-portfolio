import { describe, expect, it } from 'vitest';

import { fallbackProjects } from '@/content/fallback/projects';
import { getContentSource, getPortfolioContent, getProjectBySlug } from '@/lib/content/provider';
import { isPublishedStatus } from '@/lib/content/validation';

describe('fallback content provider', () => {
  it('returns fallback portfolio content without Sanity credentials', async () => {
    const content = await getPortfolioContent();

    expect(getContentSource()).toBe('fallback');
    expect(content.source).toBe('fallback');
    expect(content.error).toBe('not-configured');
    expect(content.projects.length).toBeGreaterThan(0);
    expect(content.capabilities).toHaveLength(3);
    expect(content.tools).toHaveLength(4);
    expect(content.contact.email).toBeTruthy();
  });

  it('returns sample project by slug from fallback fixtures', async () => {
    const { project } = await getProjectBySlug('sample-project');

    expect(project).not.toBeNull();
    expect(project?.slug).toBe('sample-project');
    expect(project?.caseStudyBlocks.length).toBeGreaterThan(0);
  });

  it('excludes non-published projects outside preview mode', async () => {
    const draftOnlySlug = 'draft-only-project';

    expect(fallbackProjects.some((project) => project.slug === draftOnlySlug)).toBe(false);

    const published = fallbackProjects.filter((project) => isPublishedStatus(project.status));
    expect(published.every((project) => project.status === 'published')).toBe(true);
  });
});
