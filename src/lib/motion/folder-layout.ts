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

/** Art-directed initial positions — deterministic for SSR/hydration. */
export const FOLDER_STACK_LAYOUT: readonly FolderStackSlot[] = [
  { x: -42, y: -60, rotate: -6, z: 1 },
  { x: -14, y: -76, rotate: -2, z: 2 },
  { x: 16, y: -72, rotate: 3, z: 3 },
  { x: 40, y: -54, rotate: 6, z: 4 },
] as const;

export const MAX_HERO_FRAGMENTS = 4;
export const MAX_DECORATIVE_SHEETS = 2;

export const FACET_ACCENTS = ['#9A6CFF', '#58D6F7', '#C2A7FF', '#7C5CDB'] as const;

export type FolderFragmentState = 'stacked' | 'dragging' | 'returning';

export const FOLDER_DRAG_CONSTRAINTS = {
  left: -120,
  right: 120,
  top: -100,
  bottom: 80,
} as const;

export const FOLDER_SPRING = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 34,
  mass: 0.72,
};

export function getStackSlot(index: number): FolderStackSlot {
  return FOLDER_STACK_LAYOUT[index % FOLDER_STACK_LAYOUT.length]!;
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
