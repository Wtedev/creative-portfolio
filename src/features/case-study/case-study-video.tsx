'use client';

import { useEffect, useRef } from 'react';

import { PlaceholderMedia } from '@/components/ui/placeholder-media';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type { VideoBlock } from '@/types/project';
import type { Locale } from '@/types/global';

type CaseStudyVideoProps = {
  block: VideoBlock;
  locale: Locale;
};

export function CaseStudyVideo({ block, locale }: CaseStudyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const title = block.title ? getLocalizedValue(block.title, locale) : undefined;
  const fallback = getLocalizedValue(block.fallbackText, locale);
  const src = block.fileUrl ?? block.externalUrl;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !block.autoplay) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    void video.play().catch(() => undefined);
  }, [block.autoplay, src]);

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
        ref={videoRef}
        className="case-study-video"
        controls
        playsInline
        preload="metadata"
        poster={block.poster}
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
