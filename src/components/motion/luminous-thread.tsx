'use client';

import { useEffect, useRef } from 'react';

import { getReducedMotionPreference, prefersFinePointer } from '@/lib/motion/preferences';

const SECTIONS = ['hero', 'work', 'tools', 'about', 'contact'] as const;

const SECTION_ANCHORS: Record<
  (typeof SECTIONS)[number],
  { x: number; y: number; intensity: number }
> = {
  hero: { x: 50, y: 38, intensity: 0.26 },
  work: { x: 32, y: 58, intensity: 0.2 },
  tools: { x: 50, y: 52, intensity: 0.18 },
  about: { x: 68, y: 50, intensity: 0.12 },
  contact: { x: 50, y: 58, intensity: 0.24 },
};

export function LuminousThread() {
  const layerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 50, y: 40 });
  const activeSectionRef = useRef<(typeof SECTIONS)[number]>('hero');

  useEffect(() => {
    const root = document.documentElement;
    const reduced = getReducedMotionPreference();
    const finePointer = prefersFinePointer() && !reduced;
    const layer = layerRef.current;

    if (!layer) return;

    const applyState = (section: (typeof SECTIONS)[number], pointerBlend = 0) => {
      const anchor = SECTION_ANCHORS[section];
      const x = anchor.x + (pointerRef.current.x - 50) * pointerBlend;
      const y = anchor.y + (pointerRef.current.y - 40) * pointerBlend;
      root.style.setProperty('--thread-x', `${x}%`);
      root.style.setProperty('--thread-y', `${y}%`);
      root.style.setProperty('--thread-opacity', String(anchor.intensity));
      root.dataset.luminousSection = section;
    };

    applyState('hero');

    if (reduced) {
      return;
    }

    const sections = SECTIONS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => Boolean(element),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        if (document.hidden) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (
          visible?.target.id &&
          SECTIONS.includes(visible.target.id as (typeof SECTIONS)[number])
        ) {
          activeSectionRef.current = visible.target.id as (typeof SECTIONS)[number];
          applyState(activeSectionRef.current, finePointer ? 0.08 : 0);
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.15, 0.35, 0.55] },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    let raf = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer || document.hidden) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        pointerRef.current = {
          x: (event.clientX / window.innerWidth) * 100,
          y: (event.clientY / window.innerHeight) * 100,
        };
        applyState(activeSectionRef.current, 0.08);
      });
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        return;
      }
      applyState(activeSectionRef.current, finePointer ? 0.08 : 0);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(raf);
      delete root.dataset.luminousSection;
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className="luminous-thread"
      aria-hidden="true"
      data-testid="luminous-thread"
    />
  );
}
