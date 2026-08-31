import { describe, expect, it } from 'vitest';

import {
  buildHeroFolderContent,
  buildHeroFragments,
  filterPublishedSummaries,
} from '@/lib/content/hero-fragments';
import { createDragIntentTracker, hasExceededDragThreshold } from '@/lib/motion/drag-intent';
import {
  clampToBounds,
  FOLDER_DRAG_CONSTRAINTS,
  FOLDER_SPRING,
  FOLDER_Z,
  getDecorativeSlot,
  getProjectSlot,
  getStackSlot,
  MAX_HERO_FRAGMENTS,
} from '@/lib/motion/folder-layout';
import { fallbackProjectSummaries } from '@/content/fallback/projects';
import type { ProjectSummary } from '@/types/project';

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
  it('returns deterministic decorative slots', () => {
    expect(getDecorativeSlot(0)).toEqual({ x: -46, y: 22, rotate: -4, z: 2 });
    expect(getDecorativeSlot(0)).toEqual(getDecorativeSlot(0));
    expect(getDecorativeSlot(0).rotate).not.toBe(getDecorativeSlot(1).rotate);
  });

  it('returns a forward project slot for a single project', () => {
    expect(getProjectSlot(0, 1)).toEqual({ x: 42, y: 16, rotate: 4, z: 3 });
  });

  it('maps legacy stack indices to decorative and project slots', () => {
    expect(getStackSlot(0)).toEqual(getDecorativeSlot(0));
    expect(getStackSlot(2)).toEqual(getProjectSlot(0, 1));
  });

  it('uses explicit z-index tokens', () => {
    expect(FOLDER_Z.front).toBeGreaterThan(FOLDER_Z.card);
    expect(FOLDER_Z.dragging).toBeGreaterThan(FOLDER_Z.front);
  });

  it('clamps positions to safe bounds', () => {
    expect(clampToBounds(999, -999, { minX: -100, maxX: 100, minY: -80, maxY: 80 })).toEqual({
      x: 100,
      y: -80,
    });
  });

  it('uses bounded drag constraints', () => {
    expect(FOLDER_DRAG_CONSTRAINTS.left).toBeLessThan(0);
    expect(FOLDER_DRAG_CONSTRAINTS.right).toBeGreaterThan(0);
    expect(Math.abs(FOLDER_DRAG_CONSTRAINTS.left)).toBeLessThanOrEqual(100);
  });

  it('uses a controlled spring for returns', () => {
    expect(FOLDER_SPRING.stiffness).toBeGreaterThan(300);
    expect(FOLDER_SPRING.damping).toBeGreaterThan(20);
  });
});

describe('hero folder content', () => {
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

  it('does not duplicate a single fallback project into four cards', () => {
    const content = buildHeroFolderContent(fallbackProjectSummaries, 'en');
    expect(content.projects).toHaveLength(1);
    expect(content.projects[0]?.slug).toBe('sample-project');
    expect(content.decorativeSheets.length).toBeGreaterThan(0);
    expect(new Set(content.projects.map((project) => project.slug)).size).toBe(1);
  });

  it('creates one card per unique published project', () => {
    const many = Array.from({ length: 8 }, (_, index) => ({
      ...fallbackProjectSummaries[0]!,
      _id: `p-${index}`,
      slug: `project-${index}`,
    }));
    const content = buildHeroFolderContent(many, 'en');
    expect(content.projects).toHaveLength(MAX_HERO_FRAGMENTS);
    expect(content.decorativeSheets).toHaveLength(0);
    expect(new Set(content.projects.map((project) => project.slug)).size).toBe(MAX_HERO_FRAGMENTS);
  });

  it('deduplicates projects by slug', () => {
    const duplicated = [
      ...fallbackProjectSummaries,
      {
        ...fallbackProjectSummaries[0]!,
        _id: 'duplicate-id',
      },
    ];
    const content = buildHeroFolderContent(duplicated, 'en');
    expect(content.projects).toHaveLength(1);
  });

  it('buildHeroFragments returns unique project cards only', () => {
    expect(buildHeroFragments(fallbackProjectSummaries, 'en')).toHaveLength(1);
  });
});
