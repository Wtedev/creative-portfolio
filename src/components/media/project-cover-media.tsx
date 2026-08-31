import Image from 'next/image';

import { PlaceholderMedia } from '@/components/ui/placeholder-media';
import { getImageUrl } from '@/sanity/lib/image';
import type { AspectRatioPreset } from '@/types/project';

type ProjectCoverMediaProps = {
  cover?: string;
  alt: string;
  variant?: 'landscape' | 'wide' | 'square' | 'portrait';
  aspect?: AspectRatioPreset;
  priority?: boolean;
  layoutId?: string;
  className?: string;
};

function aspectClass(aspect?: AspectRatioPreset, variant?: string): string {
  if (aspect === 'portrait') return 'project-media--portrait';
  if (aspect === 'square') return 'project-media--square';
  if (aspect === 'wide') return 'project-media--wide';
  if (variant === 'wide') return 'project-media--wide';
  if (variant === 'portrait') return 'project-media--portrait';
  if (variant === 'square') return 'project-media--square';
  return 'project-media--landscape';
}

export function ProjectCoverMedia({
  cover,
  alt,
  variant = 'landscape',
  aspect,
  priority = false,
  layoutId,
  className = '',
}: ProjectCoverMediaProps) {
  const imageUrl = cover?.startsWith('http')
    ? cover
    : getImageUrl(cover, { width: 1600, quality: 85 });
  const classes = `project-media ${aspectClass(aspect, variant)} ${className}`.trim();

  if (!imageUrl) {
    return (
      <div className={classes} data-layout-id={layoutId}>
        <PlaceholderMedia label={alt} variant={variant} />
      </div>
    );
  }

  return (
    <div className={classes} data-layout-id={layoutId}>
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
        priority={priority}
        className="project-media__image"
      />
    </div>
  );
}
