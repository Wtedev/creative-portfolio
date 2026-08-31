'use client';

import { motion, useReducedMotion } from 'motion/react';

import { ProjectCoverMedia } from '@/components/media/project-cover-media';

type ProjectCardMediaProps = {
  slug: string;
  cover?: string;
  alt: string;
  variant: 'landscape' | 'wide';
};

export function ProjectCardMedia({ slug, cover, alt, variant }: ProjectCardMediaProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <ProjectCoverMedia cover={cover} alt={alt} variant={variant} />;
  }

  return (
    <motion.div layoutId={`project-cover-${slug}`} className="work-card__media-motion">
      <ProjectCoverMedia cover={cover} alt={alt} variant={variant} />
    </motion.div>
  );
}
