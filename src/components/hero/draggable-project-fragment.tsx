'use client';

import { motion, type PanInfo } from 'motion/react';
import { useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';

import { PlaceholderMedia } from '@/components/ui/placeholder-media';
import { Link } from '@/i18n/navigation';
import { createDragIntentTracker } from '@/lib/motion/drag-intent';
import type { FolderFragmentState, HeroProjectFragment } from '@/lib/motion/folder-layout';

type DraggableProjectFragmentProps = {
  fragment: HeroProjectFragment;
  state: FolderFragmentState;
  initial: { x: number; y: number; rotate: number; z: number };
  openLabel: string;
  dragEnabled: boolean;
  reducedMotion: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, info: PanInfo) => void;
  onReturn: (id: string) => void;
  returnLabel: string;
};

export function DraggableProjectFragment({
  fragment,
  state,
  initial,
  openLabel,
  dragEnabled,
  reducedMotion,
  onDragStart,
  onDragEnd,
  onReturn,
  returnLabel,
}: DraggableProjectFragmentProps) {
  const intentRef = useRef(createDragIntentTracker());
  const suppressClickRef = useRef(false);

  const style = {
    ['--fragment-accent' as string]: fragment.accentColor ?? 'var(--color-accent)',
    zIndex: state === 'dragging' ? 40 : state === 'inspecting' ? 20 + fragment.index : initial.z,
  } as CSSProperties;

  const handlePointerDown = (event: ReactPointerEvent) => {
    intentRef.current.start(event.clientX, event.clientY);
    suppressClickRef.current = false;
  };

  const handleClickCapture = (event: React.MouseEvent) => {
    if (suppressClickRef.current || intentRef.current.isDragging()) {
      event.preventDefault();
      event.stopPropagation();
      suppressClickRef.current = false;
      intentRef.current.reset();
    }
  };

  return (
    <motion.article
      className="folder-fragment"
      data-state={state}
      data-testid={`folder-fragment-${fragment.index}`}
      style={style}
      drag={dragEnabled}
      dragMomentum={!reducedMotion}
      dragElastic={0.12}
      dragConstraints={{ left: -180, right: 180, top: -160, bottom: 120 }}
      initial={false}
      animate={
        state === 'stacked' || state === 'returning'
          ? { x: initial.x, y: initial.y, rotate: initial.rotate, scale: 1 }
          : state === 'dragging'
            ? { scale: reducedMotion ? 1 : 1.04, rotate: initial.rotate * 0.4 }
            : undefined
      }
      transition={
        reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 28, mass: 0.8 }
      }
      onPointerDown={handlePointerDown}
      onDragStart={() => {
        suppressClickRef.current = true;
        onDragStart(fragment.id);
      }}
      onDrag={(_, info) => {
        intentRef.current.move(
          (info.point?.x ?? 0) + info.offset.x,
          (info.point?.y ?? 0) + info.offset.y,
        );
        if (hasMoved(info)) suppressClickRef.current = true;
      }}
      onDragEnd={(_, info) => {
        if (hasMoved(info)) suppressClickRef.current = true;
        onDragEnd(fragment.id, info);
        intentRef.current.reset();
      }}
      onClickCapture={handleClickCapture}
    >
      <div className="folder-fragment__sheet">
        <div className="folder-fragment__body">
          <p className="folder-fragment__meta text-label">
            <span>{String(fragment.index + 1).padStart(2, '0')}</span>
            {fragment.facetLabel ? <span>{fragment.facetLabel}</span> : null}
            {fragment.category ? <span>{fragment.category}</span> : null}
            {fragment.year ? <span dir="ltr">{fragment.year}</span> : null}
          </p>
          <p className="folder-fragment__title text-small">{fragment.title}</p>
          <div className="folder-fragment__actions">
            <Link
              href={`/project/${fragment.slug}`}
              className="folder-fragment__link text-link text-link--inline"
              aria-label={`${openLabel}: ${fragment.title}`}
              data-testid={`folder-fragment-link-${fragment.index}`}
              onPointerDown={(event) => event.stopPropagation()}
            >
              {openLabel}
            </Link>
            {state === 'inspecting' ? (
              <button
                type="button"
                className="folder-fragment__return"
                onClick={() => onReturn(fragment.id)}
                onPointerDown={(event) => event.stopPropagation()}
              >
                {returnLabel}
              </button>
            ) : null}
          </div>
        </div>
        <div className="folder-fragment__media" aria-hidden={Boolean(fragment.cover)}>
          {fragment.cover ? (
            // eslint-disable-next-line @next/next/no-img-element -- lightweight hero thumbnails
            <img src={fragment.cover} alt="" className="folder-fragment__image" loading="lazy" />
          ) : (
            <PlaceholderMedia
              label={fragment.coverAlt}
              variant={fragment.index % 2 === 0 ? 'landscape' : 'square'}
              className="folder-fragment__placeholder"
            />
          )}
        </div>
      </div>
    </motion.article>
  );
}

function hasMoved(info: PanInfo): boolean {
  return Math.hypot(info.offset.x, info.offset.y) >= 8;
}
