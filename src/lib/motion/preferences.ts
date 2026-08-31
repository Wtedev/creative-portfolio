export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export const motionDurations = {
  fast: 0.16,
  standard: 0.3,
  reveal: 0.6,
  section: 0.8,
} as const;

export function getReducedMotionPreference(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function prefersFinePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: fine) and (hover: hover)').matches;
}

export type PrototypeProvider = 'figma' | 'vimeo' | 'youtube' | 'other';

const ALLOWED_EMBED_HOSTS: Record<PrototypeProvider, string[]> = {
  figma: ['figma.com', 'www.figma.com'],
  vimeo: ['vimeo.com', 'player.vimeo.com'],
  youtube: ['youtube.com', 'www.youtube.com', 'youtu.be'],
  other: [],
};

export function isAllowedPrototypeEmbed(
  url: string | undefined,
  provider: PrototypeProvider | undefined,
): boolean {
  if (!url || !provider || provider === 'other') return false;

  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '');
    return ALLOWED_EMBED_HOSTS[provider].some(
      (host) => hostname === host.replace(/^www\./, '') || hostname.endsWith(`.${host}`),
    );
  } catch {
    return false;
  }
}

export function normalizeExternalUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return `https://${trimmed}`;
  }
  return trimmed;
}
