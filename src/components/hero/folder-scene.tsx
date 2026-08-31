'use client';

import { useCallback, useId, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { DecorativeFolderSheet } from '@/components/hero/decorative-folder-sheet';
import { DraggableProjectFragment } from '@/components/hero/draggable-project-fragment';
import { FolderShell } from '@/components/hero/folder-shell';
import type { HeroFolderContent } from '@/lib/content/hero-fragments';
import {
  getStackSlot,
  type FolderFragmentState,
  type HeroProjectFragment,
} from '@/lib/motion/folder-layout';

type FolderSceneProps = {
  content: HeroFolderContent;
};

type FragmentRuntime = {
  state: FolderFragmentState;
};

function createInitialRuntime(projects: HeroProjectFragment[]): Record<string, FragmentRuntime> {
  return Object.fromEntries(
    projects.map((fragment) => [fragment.id, { state: 'stacked' as const }]),
  );
}

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function subscribeFinePointer(onChange: () => void) {
  const media = window.matchMedia('(pointer: fine) and (hover: hover)');
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function subscribeNarrow(onChange: () => void) {
  const media = window.matchMedia('(max-width: 767px)');
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getFinePointerSnapshot() {
  return window.matchMedia('(pointer: fine) and (hover: hover)').matches;
}

function getNarrowSnapshot() {
  return window.matchMedia('(max-width: 767px)').matches;
}

function getServerFalse() {
  return false;
}

function getServerTrue() {
  return true;
}

export function FolderScene({ content }: FolderSceneProps) {
  const t = useTranslations('hero');
  const locale = useLocale();
  const pathname = usePathname();
  const instructionId = useId();
  const { projects, decorativeSheets } = content;
  const sceneKey = `${locale}:${pathname}:${projects.map((fragment) => fragment.id).join('|')}`;
  const [runtime, setRuntime] = useState(() => createInitialRuntime(projects));
  const [runtimeKey, setRuntimeKey] = useState(sceneKey);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  if (runtimeKey !== sceneKey) {
    setRuntimeKey(sceneKey);
    setRuntime(createInitialRuntime(projects));
    setActiveDragId(null);
  }

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerFalse,
  );
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getServerTrue,
  );
  const narrow = useSyncExternalStore(subscribeNarrow, getNarrowSnapshot, getServerFalse);

  const dragEnabled = !reducedMotion && finePointer && !narrow;
  const stackScale = narrow ? 0.82 : 1;

  const handleDragStart = useCallback((id: string) => {
    setActiveDragId(id);
    setRuntime((current) => ({
      ...current,
      [id]: { state: 'dragging' },
    }));
  }, []);

  const handleDragEnd = useCallback(
    (id: string, dragged: boolean) => {
      setActiveDragId(null);
      if (!dragged) {
        setRuntime((current) => ({
          ...current,
          [id]: { state: 'stacked' },
        }));
        return;
      }

      setRuntime((current) => ({
        ...current,
        [id]: { state: reducedMotion ? 'stacked' : 'returning' },
      }));
    },
    [reducedMotion],
  );

  const handleReturnComplete = useCallback((id: string) => {
    setRuntime((current) => ({
      ...current,
      [id]: { state: 'stacked' },
    }));
  }, []);

  if (projects.length === 0) {
    return null;
  }

  return (
    <div
      className="folder-scene"
      data-narrow={narrow ? 'true' : 'false'}
      data-dragging={activeDragId ? 'true' : 'false'}
      aria-describedby={instructionId}
      style={{ ['--folder-light' as string]: activeDragId ? 0.34 : 0.16 }}
    >
      <p id={instructionId} className="visually-hidden">
        {dragEnabled ? t('folderInstruction') : t('folderInstructionTouch')}
      </p>
      <FolderShell label={t('selectedWorks')} dragging={Boolean(activeDragId)}>
        {decorativeSheets.map((sheet) => (
          <DecorativeFolderSheet key={sheet.id} sheet={sheet} scale={stackScale} />
        ))}
        {projects.map((fragment) => {
          const entry = runtime[fragment.id] ?? { state: 'stacked' as const };
          const slot = getStackSlot(fragment.index);
          const scaledSlot = {
            x: slot.x * stackScale,
            y: slot.y * stackScale,
            rotate: slot.rotate,
            z: slot.z,
          };

          return (
            <DraggableProjectFragment
              key={fragment.id}
              fragment={fragment}
              state={entry.state}
              slot={scaledSlot}
              openLabel={t('openProject')}
              dragEnabled={dragEnabled}
              reducedMotion={reducedMotion}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onReturnComplete={handleReturnComplete}
            />
          );
        })}
      </FolderShell>
    </div>
  );
}
