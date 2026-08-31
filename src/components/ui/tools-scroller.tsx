'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type ToolsScrollerProps = {
  children: React.ReactNode;
  prevLabel: string;
  nextLabel: string;
  trackLabel: string;
};

function getScrollMetrics(track: HTMLDivElement) {
  const { scrollLeft, scrollWidth, clientWidth } = track;
  const maxScroll = Math.max(scrollWidth - clientWidth, 0);
  const isRtl = getComputedStyle(track).direction === 'rtl';

  // Normalize across negative-scrollLeft and reverse-scrollLeft RTL engines.
  let progress = 0;
  if (maxScroll > 0) {
    if (isRtl && scrollLeft <= 0) {
      progress = Math.min(Math.abs(scrollLeft) / maxScroll, 1);
    } else if (isRtl && scrollLeft > 0) {
      progress = Math.min(scrollLeft / maxScroll, 1);
    } else {
      progress = Math.min(scrollLeft / maxScroll, 1);
    }
  }

  return { progress, maxScroll, isRtl };
}

export function ToolsScroller({ children, prevLabel, nextLabel, trackLabel }: ToolsScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const metrics = getScrollMetrics(track);
    setIsRtl(metrics.isRtl);
    setCanScrollPrev(metrics.progress > 0.02);
    setCanScrollNext(metrics.progress < 0.98 && metrics.maxScroll > 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      track.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByPage = (direction: 'prev' | 'next') => {
    const track = trackRef.current;
    if (!track) return;

    const amount = track.clientWidth * 0.75;
    const rtl = getComputedStyle(track).direction === 'rtl';
    let delta = direction === 'next' ? amount : -amount;
    if (rtl) delta = -delta;
    track.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <div className="tools-scroller" data-dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="tools-scroller__controls">
        <button
          type="button"
          className="tools-scroller__control tools-scroller__control--prev"
          aria-label={prevLabel}
          disabled={!canScrollPrev}
          onClick={() => scrollByPage('prev')}
        >
          <span aria-hidden="true">{isRtl ? '›' : '‹'}</span>
        </button>
        <button
          type="button"
          className="tools-scroller__control tools-scroller__control--next"
          aria-label={nextLabel}
          disabled={!canScrollNext}
          onClick={() => scrollByPage('next')}
        >
          <span aria-hidden="true">{isRtl ? '‹' : '›'}</span>
        </button>
      </div>
      <div
        ref={trackRef}
        className="tools-scroller__track"
        role="region"
        aria-label={trackLabel}
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
}
