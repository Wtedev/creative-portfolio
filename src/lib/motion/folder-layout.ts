export type HeroProjectFragment = {
  id: string;
  slug: string;
  title: string;
  category?: string;
  cover?: string;
  coverAlt: string;
  accentColor?: string;
  index: number;
};

export type HeroDecorativeSheet = {
  id: string;
  index: number;
  accentColor: string;
};

export type FolderStackSlot = {
  x: number;
  y: number;
  rotate: number;
  z: number;
};

/** Decorative sheet fan — behind project cards. */
const DECORATIVE_SLOTS: readonly FolderStackSlot[] = [
  { x: -46, y: 22, rotate: -4, z: 2 },
  { x: -6, y: 10, rotate: -1, z: 2 },
] as const;

/** Project card fan when multiple projects fill the folder. */
const PROJECT_FAN: readonly FolderStackSlot[] = [
  { x: -46, y: 22, rotate: -4, z: 3 },
  { x: -12, y: 14, rotate: -2, z: 3 },
  { x: 36, y: 18, rotate: 4, z: 3 },
  { x: 42, y: 16, rotate: 5, z: 3 },
] as const;

const SINGLE_PROJECT_SLOT: FolderStackSlot = { x: 42, y: 16, rotate: 4, z: 3 };

export const MAX_HERO_FRAGMENTS = 4;
export const MAX_DECORATIVE_SHEETS = 2;

export const FACET_ACCENTS = ['#9A6CFF', '#58D6F7', '#C2A7FF', '#7C5CDB'] as const;

export type FolderFragmentState = 'stacked' | 'dragging' | 'returning';

/** Bounded for smaller folder shell — prevents covering the header. */
export const FOLDER_DRAG_CONSTRAINTS = {
  left: -88,
  right: 88,
  top: -68,
  bottom: 52,
} as const;

export const FOLDER_SPRING = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 34,
  mass: 0.72,
};

export const FOLDER_Z = {
  glow: 0,
  back: 1,
  decorative: 2,
  card: 3,
  front: 4,
  label: 5,
  dragging: 10,
} as const;

export function getDecorativeSlot(index: number): FolderStackSlot {
  return DECORATIVE_SLOTS[index % DECORATIVE_SLOTS.length]!;
}

export function getProjectSlot(projectIndex: number, totalProjects: number): FolderStackSlot {
  if (totalProjects === 1) {
    return SINGLE_PROJECT_SLOT;
  }
  return PROJECT_FAN[projectIndex % PROJECT_FAN.length]!;
}

/** @deprecated Prefer getDecorativeSlot / getProjectSlot */
export function getStackSlot(index: number): FolderStackSlot {
  if (index < DECORATIVE_SLOTS.length) {
    return getDecorativeSlot(index);
  }
  return getProjectSlot(index - DECORATIVE_SLOTS.length, 1);
}

export function clampToBounds(
  x: number,
  y: number,
  bounds: { minX: number; maxX: number; minY: number; maxY: number },
): { x: number; y: number } {
  return {
    x: Math.min(bounds.maxX, Math.max(bounds.minX, x)),
    y: Math.min(bounds.maxY, Math.max(bounds.minY, y)),
  };
}
