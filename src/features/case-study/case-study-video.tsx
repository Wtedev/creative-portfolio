'use client';

import { useReducedMotion } from 'motion/react';

import { PlaceholderMedia } from '@/components/ui/placeholder-media';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type { VideoBlock } from '@/types/project';
import type { Locale } from '@/types/global';

type CaseStudyVideoProps = {
  block: VideoBlock;
  locale: Locale;
};

export function CaseStudyVideo({ block, locale }: CaseStudyVideoProps) {
  const reducedMotion = useReducedMotion();
  const title = block.title ? getLocalizedValue(block.title, locale) : undefined;
  const fallback = getLocalizedValue(block.fallbackText, locale);
  const src = block.fileUrl ?? block.externalUrl;

  if (!src) {
    return (
      <figure className="case-study-block case-study-block--video">
        <PlaceholderMedia label={fallback} />
        {title ? <figcaption className="text-small">{title}</figcaption> : null}
      </figure>
    );
  }

  return (
    <figure className="case-study-block case-study-block--video">
      <video
        className="case-study-video"
        controls
        playsInline
        preload="metadata"
        poster={block.poster}
        autoPlay={Boolean(block.autoplay && !reducedMotion)}
        muted={block.muted ?? block.autoplay}
        loop={block.loop}
      >
        <source src={src} />
        {fallback}
      </video>
      {title ? <figcaption className="text-small">{title}</figcaption> : null}
    </figure>
  );
}
