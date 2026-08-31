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

const DECORATIVE_LEFT: FolderStackSlot = { x: -52, y: 12, rotate: -5, z: 2 };
const DECORATIVE_RIGHT: FolderStackSlot = { x: 52, y: 12, rotate: 5, z: 2 };

const PROJECT_SLOTS: Record<number, readonly FolderStackSlot[]> = {
  1: [{ x: 0, y: 28, rotate: 0, z: 3 }],
  2: [
    { x: -28, y: 0, rotate: -3, z: 3 },
    { x: 28, y: 0, rotate: 3, z: 3 },
  ],
  3: [
    { x: -46, y: 10, rotate: -5, z: 3 },
    { x: 0, y: -8, rotate: 0, z: 3 },
    { x: 46, y: 10, rotate: 5, z: 3 },
  ],
  4: [
    { x: -62, y: 16, rotate: -6, z: 3 },
    { x: -22, y: -2, rotate: -2, z: 3 },
    { x: 22, y: -2, rotate: 2, z: 3 },
    { x: 62, y: 16, rotate: 6, z: 3 },
  ],
};

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
  return index === 0 ? DECORATIVE_LEFT : DECORATIVE_RIGHT;
}

export function getProjectSlot(projectIndex: number, totalProjects: number): FolderStackSlot {
  const slots = PROJECT_SLOTS[totalProjects] ?? PROJECT_SLOTS[1]!;
  return slots[projectIndex % slots.length]!;
}

/** @deprecated Prefer getDecorativeSlot / getProjectSlot */
export function getStackSlot(index: number): FolderStackSlot {
  if (index < MAX_DECORATIVE_SHEETS) {
    return getDecorativeSlot(index);
  }
  return getProjectSlot(index - MAX_DECORATIVE_SHEETS, 1);
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
