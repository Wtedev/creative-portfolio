import { describe, expect, it } from 'vitest';

import { buildHeroFragments, filterPublishedSummaries } from '@/lib/content/hero-fragments';
import { createDragIntentTracker, hasExceededDragThreshold } from '@/lib/motion/drag-intent';
import {
  clampToBounds,
  getStackSlot,
  isInsideReturnZone,
  MAX_HERO_FRAGMENTS,
} from '@/lib/motion/folder-layout';
import { fallbackProjectSummaries } from '@/content/fallback/projects';
import type { ProjectSummary } from '@/types/project';

const facetLabels = {
  idea: 'Idea',
  direction: 'Direction',
  system: 'System',
  experience: 'Experience',
};

describe('drag intent', () => {
  it('detects threshold crossings', () => {
    expect(hasExceededDragThreshold(3, 4)).toBe(false);
    expect(hasExceededDragThreshold(6, 6)).toBe(true);
  });

  it('tracks intent across moves', () => {
    const tracker = createDragIntentTracker(8);
    tracker.start(0, 0);
    expect(tracker.move(2, 2)).toBe(false);
    expect(tracker.move(10, 0)).toBe(true);
    expect(tracker.isDragging()).toBe(true);
  });
});

describe('folder layout helpers', () => {
  it('returns deterministic stack slots', () => {
    expect(getStackSlot(0)).toEqual(getStackSlot(0));
    expect(getStackSlot(0).rotate).not.toBe(getStackSlot(1).rotate);
  });

  it('clamps positions to safe bounds', () => {
    expect(clampToBounds(999, -999, { minX: -100, maxX: 100, minY: -80, maxY: 80 })).toEqual({
      x: 100,
      y: -80,
    });
  });

  it('detects return zone membership', () => {
    expect(isInsideReturnZone(0, 10, { left: -40, right: 40, top: -20, bottom: 60 })).toBe(true);
    expect(isInsideReturnZone(80, 10, { left: -40, right: 40, top: -20, bottom: 60 })).toBe(false);
  });
});

describe('hero fragments', () => {
  it('filters published projects only', () => {
    const mixed: ProjectSummary[] = [
      ...fallbackProjectSummaries,
      {
        ...fallbackProjectSummaries[0]!,
        _id: 'draft',
        slug: 'draft-project',
        status: 'draft',
      },
    ];
    expect(filterPublishedSummaries(mixed)).toHaveLength(1);
  });

  it('pads a single project into editorial facets without inventing slugs', () => {
    const fragments = buildHeroFragments(fallbackProjectSummaries, 'en', facetLabels);
    expect(fragments).toHaveLength(MAX_HERO_FRAGMENTS);
    expect(fragments.every((fragment) => fragment.slug === 'sample-project')).toBe(true);
    expect(fragments[1]?.facetLabel).toBeTruthy();
  });

  it('limits fragment count', () => {
    const many = Array.from({ length: 8 }, (_, index) => ({
      ...fallbackProjectSummaries[0]!,
      _id: `p-${index}`,
      slug: `project-${index}`,
    }));
    expect(buildHeroFragments(many, 'en', facetLabels)).toHaveLength(MAX_HERO_FRAGMENTS);
  });
});
