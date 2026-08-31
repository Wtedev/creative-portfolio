'use client';

import { LayoutGroup, LazyMotion, domAnimation, MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

import { LenisProvider } from '@/components/motion/lenis-provider';
import { LuminousThread } from '@/components/motion/luminous-thread';
import { MOTION_EASE } from '@/lib/motion/preferences';

type SiteMotionProviderProps = {
  children: ReactNode;
  enableHomeEffects?: boolean;
};

export function SiteMotionProvider({
  children,
  enableHomeEffects = false,
}: SiteMotionProviderProps) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user" transition={{ ease: MOTION_EASE, duration: 0.3 }}>
        <LayoutGroup>
          <LenisProvider>
            {enableHomeEffects ? <LuminousThread /> : null}
            {children}
          </LenisProvider>
        </LayoutGroup>
      </MotionConfig>
    </LazyMotion>
  );
}
