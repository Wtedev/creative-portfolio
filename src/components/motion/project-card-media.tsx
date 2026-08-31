'use client';

import { motion } from 'motion/react';

import { ProjectCoverMedia } from '@/components/media/project-cover-media';

type ProjectCardMediaProps = {
  slug: string;
  cover?: string;
  alt: string;
  variant: 'landscape' | 'wide';
  priority?: boolean;
};

export function ProjectCardMedia({
  slug,
  cover,
  alt,
  variant,
  priority = false,
}: ProjectCardMediaProps) {
  return (
    <motion.div layoutId={`project-cover-${slug}`} className="work-card__media-motion">
      <ProjectCoverMedia cover={cover} alt={alt} variant={variant} priority={priority} />
    </motion.div>
  );
}
