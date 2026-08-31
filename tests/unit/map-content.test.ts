import { describe, expect, it } from 'vitest';

import {
  isKnownCaseStudyBlock,
  mapSanityProject,
  mapSanityProjects,
} from '@/sanity/adapters/map-content';

describe('Sanity content adapter', () => {
  it('maps raw project data into typed frontend models', () => {
    const project = mapSanityProject({
      _id: 'project-1',
      title: { en: 'Sample', ar: 'تجريبي' },
      slug: 'sample',
      client: 'Client',
      year: 2025,
      role: { en: 'Art Direction', ar: 'إخراج فني' },
      categories: ['Brand'],
      services: ['Identity'],
      shortDescription: { en: 'Short', ar: 'قصير' },
      coverAlt: { en: 'Cover', ar: 'غلاف' },
      cardSize: 'hero',
      featured: true,
      order: 1,
      caseStudyBlocks: [],
      credits: [],
      results: [],
      seoTitle: { en: 'SEO', ar: 'سيو' },
      seoDescription: { en: 'Desc', ar: 'وصف' },
      status: 'published',
    });

    expect(project.slug).toBe('sample');
    expect(project.cardSize).toBe('hero');
    expect(project.status).toBe('published');
  });

  it('sorts mapped project summaries by order', () => {
    const summaries = mapSanityProjects([
      {
        _id: '2',
        title: { en: 'Second', ar: '٢' },
        slug: 'second',
        client: 'B',
        year: 2024,
        shortDescription: { en: 'B', ar: 'ب' },
        coverAlt: { en: 'B', ar: 'ب' },
        cardSize: 'standard',
        featured: false,
        order: 2,
        status: 'published',
      },
      {
        _id: '1',
        title: { en: 'First', ar: '١' },
        slug: 'first',
        client: 'A',
        year: 2025,
        shortDescription: { en: 'A', ar: 'أ' },
        coverAlt: { en: 'A', ar: 'أ' },
        cardSize: 'standard',
        featured: true,
        order: 1,
        status: 'published',
      },
    ]);

    expect(summaries[0]?.slug).toBe('first');
  });

  it('handles unknown case-study block types safely', () => {
    const project = mapSanityProject({
      _id: 'project-2',
      title: { en: 'Blocks', ar: 'كتل' },
      slug: 'blocks',
      client: 'Client',
      year: 2025,
      role: { en: 'Role', ar: 'دور' },
      shortDescription: { en: 'Short', ar: 'قصير' },
      coverAlt: { en: 'Alt', ar: 'بديل' },
      cardSize: 'standard',
      featured: false,
      order: 1,
      caseStudyBlocks: [{ _type: 'futureBlock', _key: 'x' }],
      credits: [],
      results: [],
      seoTitle: { en: 'SEO', ar: 'سيو' },
      seoDescription: { en: 'Desc', ar: 'وصف' },
      status: 'published',
    });

    expect(project.caseStudyBlocks[0]?._type).toBe('unknownBlock');
    expect(isKnownCaseStudyBlock(project.caseStudyBlocks[0]!)).toBe(false);
  });
});
