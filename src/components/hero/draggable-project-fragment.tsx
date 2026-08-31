'use client';

import { motion, type PanInfo } from 'motion/react';
import { useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';

import { Link } from '@/i18n/navigation';
import { createDragIntentTracker } from '@/lib/motion/drag-intent';
import {
  FOLDER_DRAG_CONSTRAINTS,
  FOLDER_SPRING,
  FOLDER_Z,
  type FolderFragmentState,
  type HeroProjectFragment,
} from '@/lib/motion/folder-layout';

type DraggableProjectFragmentProps = {
  fragment: HeroProjectFragment;
  state: FolderFragmentState;
  slot: { x: number; y: number; rotate: number; z: number };
  openLabel: string;
  dragEnabled: boolean;
  reducedMotion: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, dragged: boolean) => void;
  onReturnComplete: (id: string) => void;
};

export function DraggableProjectFragment({
  fragment,
  state,
  slot,
  openLabel,
  dragEnabled,
  reducedMotion,
  onDragStart,
  onDragEnd,
  onReturnComplete,
}: DraggableProjectFragmentProps) {
  const intentRef = useRef(createDragIntentTracker());
  const suppressClickRef = useRef(false);
  const draggedRef = useRef(false);

  const style = {
    ['--fragment-accent' as string]: fragment.accentColor ?? 'var(--color-accent)',
    zIndex: state === 'dragging' ? FOLDER_Z.dragging : FOLDER_Z.card,
  } as CSSProperties;

  const handlePointerDown = (event: ReactPointerEvent) => {
    intentRef.current.start(event.clientX, event.clientY);
    suppressClickRef.current = false;
    draggedRef.current = false;
  };

  const handleClickCapture = (event: React.MouseEvent) => {
    if (suppressClickRef.current || intentRef.current.isDragging() || draggedRef.current) {
      event.preventDefault();
      event.stopPropagation();
      suppressClickRef.current = false;
      draggedRef.current = false;
      intentRef.current.reset();
    }
  };

  const springTransition = reducedMotion ? { duration: 0 } : FOLDER_SPRING;

  return (
    <motion.article
      className="folder-fragment"
      data-state={state}
      data-testid={`folder-fragment-${fragment.index}`}
      style={style}
      drag={dragEnabled}
      dragMomentum={false}
      dragElastic={0.06}
      dragConstraints={FOLDER_DRAG_CONSTRAINTS}
      initial={false}
      animate={
        state === 'stacked' || state === 'returning'
          ? { x: slot.x, y: slot.y, rotate: slot.rotate, scale: 1 }
          : state === 'dragging'
            ? { scale: reducedMotion ? 1 : 1.02, rotate: slot.rotate * 0.25 }
            : undefined
      }
      transition={springTransition}
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
        if (hasMoved(info)) {
          suppressClickRef.current = true;
          draggedRef.current = true;
        }
      }}
      onDragEnd={(_, info) => {
        const dragged = hasMoved(info);
        if (dragged) {
          suppressClickRef.current = true;
          draggedRef.current = true;
        }
        onDragEnd(fragment.id, dragged);
        intentRef.current.reset();
      }}
      onAnimationComplete={() => {
        if (state === 'returning') {
          onReturnComplete(fragment.id);
        }
      }}
      onClickCapture={handleClickCapture}
    >
      <Link
        href={`/project/${fragment.slug}`}
        className="folder-fragment__link"
        aria-label={`${openLabel}: ${fragment.title}`}
        data-testid={`folder-fragment-link-${fragment.index}`}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <div className="folder-fragment__sheet">
          <div className="folder-fragment__media">
            {fragment.cover ? (
              // eslint-disable-next-line @next/next/no-img-element -- lightweight hero thumbnails
              <img src={fragment.cover} alt="" className="folder-fragment__image" loading="lazy" />
            ) : (
              <span
                className="folder-fragment__fallback"
                role="img"
                aria-label={fragment.coverAlt}
              />
            )}
          </div>
          <div className="folder-fragment__body">
            <p className="folder-fragment__meta text-label">
              <span>{String(fragment.index + 1).padStart(2, '0')}</span>
              {fragment.category ? <span>{fragment.category}</span> : null}
            </p>
            <p className="folder-fragment__title">{fragment.title}</p>
            <span className="folder-fragment__arrow" aria-hidden="true">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function hasMoved(info: PanInfo): boolean {
  return Math.hypot(info.offset.x, info.offset.y) >= 8;
}
