'use client';

import { motion, useReducedMotion } from 'motion/react';

import { ProjectCoverMedia } from '@/components/media/project-cover-media';
import type { AspectRatioPreset } from '@/types/project';

type ProjectHeroMediaProps = {
  cover?: string;
  alt: string;
  slug: string;
  aspect?: AspectRatioPreset;
};

export function ProjectHeroMedia({ cover, alt, slug, aspect }: ProjectHeroMediaProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <ProjectCoverMedia
        cover={cover}
        alt={alt}
        variant="wide"
        aspect={aspect}
        priority
        layoutId={`project-cover-${slug}`}
      />
    );
  }

  return (
    <motion.div
      layoutId={`project-cover-${slug}`}
      className="project-hero__media-shell"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <ProjectCoverMedia cover={cover} alt={alt} variant="wide" aspect={aspect} priority />
    </motion.div>
  );
}
