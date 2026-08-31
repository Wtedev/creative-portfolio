'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type ToolsScrollerProps = {
  children: React.ReactNode;
  prevLabel: string;
  nextLabel: string;
  trackLabel: string;
};

export function ToolsScroller({ children, prevLabel, nextLabel, trackLabel }: ToolsScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    const maxScroll = scrollWidth - clientWidth;
    const isRtl = getComputedStyle(track).direction === 'rtl';

    if (isRtl) {
      setCanScrollPrev(scrollLeft < -1);
      setCanScrollNext(scrollLeft > -(maxScroll - 1));
    } else {
      setCanScrollPrev(scrollLeft > 1);
      setCanScrollNext(scrollLeft < maxScroll - 1);
    }
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

    const isRtl = getComputedStyle(track).direction === 'rtl';
    const amount = track.clientWidth * 0.75;
    let delta = direction === 'next' ? amount : -amount;

    if (isRtl) {
      delta = -delta;
    }

    track.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <div className="tools-scroller">
      <div className="tools-scroller__controls" aria-hidden={false}>
        <button
          type="button"
          className="tools-scroller__control"
          aria-label={prevLabel}
          disabled={!canScrollPrev}
          onClick={() => scrollByPage('prev')}
        >
          ‹
        </button>
        <button
          type="button"
          className="tools-scroller__control"
          aria-label={nextLabel}
          disabled={!canScrollNext}
          onClick={() => scrollByPage('next')}
        >
          ›
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
