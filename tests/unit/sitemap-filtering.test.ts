import { describe, expect, it } from 'vitest';

import { fallbackProjects } from '@/content/fallback/projects';
import { isPublishedStatus } from '@/lib/content/validation';

describe('sitemap publication filtering', () => {
  it('includes only published fallback projects', () => {
    const published = fallbackProjects.filter((project) => isPublishedStatus(project.status));
    expect(published.every((project) => project.slug === 'sample-project')).toBe(true);
    expect(published).toHaveLength(1);
  });
});
