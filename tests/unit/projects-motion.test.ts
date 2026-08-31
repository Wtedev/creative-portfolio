import { describe, expect, it } from 'vitest';

import { getNextPublishedProject, getPublishedProjectList } from '@/lib/content/projects';
import { isAllowedPrototypeEmbed, normalizeExternalUrl } from '@/lib/motion/preferences';
import type { Project } from '@/types/project';

const projects: Project[] = [
  {
    _id: '1',
    title: { en: 'Alpha', ar: 'ألفا' },
    slug: 'alpha',
    client: 'A',
    year: 2024,
    role: { en: 'Art Direction', ar: 'إخراج' },
    categories: ['Brand'],
    services: [],
    shortDescription: { en: 'One', ar: 'واحد' },
    coverAlt: { en: 'Cover', ar: 'غلاف' },
    cardSize: 'standard',
    featured: true,
    order: 1,
    caseStudyBlocks: [],
    credits: [],
    results: [],
    seoTitle: { en: 'Alpha', ar: 'ألفا' },
    seoDescription: { en: 'Alpha', ar: 'ألفا' },
    status: 'published',
  },
  {
    _id: '2',
    title: { en: 'Beta', ar: 'بيتا' },
    slug: 'beta',
    client: 'B',
    year: 2025,
    role: { en: 'Design', ar: 'تصميم' },
    categories: ['Digital'],
    services: [],
    shortDescription: { en: 'Two', ar: 'اثنان' },
    coverAlt: { en: 'Cover', ar: 'غلاف' },
    cardSize: 'standard',
    featured: false,
    order: 2,
    caseStudyBlocks: [],
    credits: [],
    results: [],
    seoTitle: { en: 'Beta', ar: 'بيتا' },
    seoDescription: { en: 'Beta', ar: 'بيتا' },
    status: 'draft',
  },
  {
    _id: '3',
    title: { en: 'Gamma', ar: 'غاما' },
    slug: 'gamma',
    client: 'C',
    year: 2025,
    role: { en: 'Dev', ar: 'تطوير' },
    categories: ['Web'],
    services: [],
    shortDescription: { en: 'Three', ar: 'ثلاثة' },
    coverAlt: { en: 'Cover', ar: 'غلاف' },
    cardSize: 'standard',
    featured: false,
    order: 3,
    caseStudyBlocks: [],
    credits: [],
    results: [],
    seoTitle: { en: 'Gamma', ar: 'غاما' },
    seoDescription: { en: 'Gamma', ar: 'غاما' },
    status: 'published',
  },
];

describe('project navigation helpers', () => {
  it('filters published projects in order', () => {
    expect(getPublishedProjectList(projects).map((project) => project.slug)).toEqual([
      'alpha',
      'gamma',
    ]);
  });

  it('selects the next published project and wraps', () => {
    expect(getNextPublishedProject(projects, 'alpha')?.slug).toBe('gamma');
    expect(getNextPublishedProject(projects, 'gamma')?.slug).toBe('alpha');
  });
});

describe('prototype embed helpers', () => {
  it('allows known providers only', () => {
    expect(isAllowedPrototypeEmbed('https://www.figma.com/proto/test', 'figma')).toBe(true);
    expect(isAllowedPrototypeEmbed('https://example.com', 'figma')).toBe(false);
  });

  it('normalizes external urls', () => {
    expect(normalizeExternalUrl('figma.com/file/test')).toBe('https://figma.com/file/test');
  });
});
