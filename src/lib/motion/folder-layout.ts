export type HeroProjectFragment = {
  id: string;
  slug: string;
  title: string;
  category?: string;
  year?: string;
  cover?: string;
  coverAlt: string;
  accentColor?: string;
  facetLabel?: string;
  index: number;
};

export type FolderStackSlot = {
  x: number;
  y: number;
  rotate: number;
  z: number;
};

/** Art-directed initial positions — deterministic for SSR/hydration. */
export const FOLDER_STACK_LAYOUT: readonly FolderStackSlot[] = [
  { x: -28, y: -108, rotate: -10, z: 1 },
  { x: 18, y: -128, rotate: 7, z: 2 },
  { x: -10, y: -88, rotate: -4, z: 3 },
  { x: 30, y: -100, rotate: 9, z: 4 },
  { x: 2, y: -76, rotate: 2, z: 5 },
] as const;

export const MAX_HERO_FRAGMENTS = 4;

export const FACET_ACCENTS = ['#9A6CFF', '#58D6F7', '#C2A7FF', '#7C5CDB'] as const;

export type FolderFragmentState = 'stacked' | 'dragging' | 'inspecting' | 'returning';

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

export function isInsideReturnZone(
  x: number,
  y: number,
  zone: { left: number; right: number; top: number; bottom: number },
): boolean {
  return x >= zone.left && x <= zone.right && y >= zone.top && y <= zone.bottom;
}

export function getInspectOffset(index: number): { x: number; y: number; rotate: number } {
  const pattern = [
    { x: -120, y: -40, rotate: -4 },
    { x: 110, y: -50, rotate: 5 },
    { x: -90, y: 20, rotate: -2 },
    { x: 100, y: 10, rotate: 3 },
  ] as const;
  return pattern[index % pattern.length]!;
}
