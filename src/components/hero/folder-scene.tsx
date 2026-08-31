'use client';

import { type PanInfo } from 'motion/react';
import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { DraggableProjectFragment } from '@/components/hero/draggable-project-fragment';
import { FolderResetControl } from '@/components/hero/folder-reset-control';
import { FolderShell } from '@/components/hero/folder-shell';
import {
  getInspectOffset,
  getStackSlot,
  type FolderFragmentState,
  type HeroProjectFragment,
} from '@/lib/motion/folder-layout';

type FolderSceneProps = {
  fragments: HeroProjectFragment[];
};

type FragmentRuntime = {
  state: FolderFragmentState;
  x: number;
  y: number;
  rotate: number;
};

function createInitialRuntime(fragments: HeroProjectFragment[]): Record<string, FragmentRuntime> {
  return Object.fromEntries(
    fragments.map((fragment) => {
      const slot = getStackSlot(fragment.index);
      return [
        fragment.id,
        {
          state: 'stacked' as const,
          x: slot.x,
          y: slot.y,
          rotate: slot.rotate,
        },
      ];
    }),
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

export function FolderScene({ fragments }: FolderSceneProps) {
  const t = useTranslations('hero');
  const locale = useLocale();
  const pathname = usePathname();
  const sceneKey = `${locale}:${pathname}:${fragments.map((fragment) => fragment.id).join('|')}`;
  const [runtime, setRuntime] = useState(() => createInitialRuntime(fragments));
  const [runtimeKey, setRuntimeKey] = useState(sceneKey);

  if (runtimeKey !== sceneKey) {
    setRuntimeKey(sceneKey);
    setRuntime(createInitialRuntime(fragments));
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

  const dragEnabled = !reducedMotion && (!narrow || finePointer);

  const dirty = useMemo(
    () => Object.values(runtime).some((entry) => entry.state !== 'stacked'),
    [runtime],
  );

  const reset = useCallback(() => {
    setRuntime(createInitialRuntime(fragments));
  }, [fragments]);

  const handleDragStart = useCallback((id: string) => {
    setRuntime((current) => ({
      ...current,
      [id]: { ...current[id]!, state: 'dragging' },
    }));
  }, []);

  const handleReturn = useCallback(
    (id: string) => {
      const fragment = fragments.find((entry) => entry.id === id);
      if (!fragment) return;
      const slot = getStackSlot(fragment.index);
      setRuntime((current) => ({
        ...current,
        [id]: {
          state: 'returning',
          x: slot.x,
          y: slot.y,
          rotate: slot.rotate,
        },
      }));
      window.setTimeout(
        () => {
          setRuntime((current) => ({
            ...current,
            [id]: {
              state: 'stacked',
              x: slot.x,
              y: slot.y,
              rotate: slot.rotate,
            },
          }));
        },
        reducedMotion ? 0 : 280,
      );
    },
    [fragments, reducedMotion],
  );

  const handleDragEnd = useCallback(
    (id: string, info: PanInfo) => {
      const fragment = fragments.find((entry) => entry.id === id);
      if (!fragment) return;
      const slot = getStackSlot(fragment.index);
      const offsetX = info.offset.x;
      const offsetY = info.offset.y;
      const nearPocket = Math.abs(offsetX) < 48 && offsetY > -20 && offsetY < 80;

      if (nearPocket) {
        handleReturn(id);
        return;
      }

      const inspect = getInspectOffset(fragment.index);
      const nextX = Math.max(-170, Math.min(170, slot.x + offsetX * 0.35 + inspect.x * 0.25));
      const nextY = Math.max(-150, Math.min(100, slot.y + offsetY * 0.35 + inspect.y * 0.2));

      setRuntime((current) => ({
        ...current,
        [id]: {
          state: 'inspecting',
          x: nextX,
          y: nextY,
          rotate: inspect.rotate,
        },
      }));
    },
    [fragments, handleReturn],
  );

  if (fragments.length === 0) {
    return null;
  }

  return (
    <div className="folder-scene" data-narrow={narrow ? 'true' : 'false'}>
      <p className="folder-scene__instruction text-small">{t('folderInstruction')}</p>
      <FolderShell label={t('selectedWorks')}>
        {fragments.map((fragment) => {
          const entry = runtime[fragment.id] ?? {
            state: 'stacked' as const,
            ...getStackSlot(fragment.index),
          };
          return (
            <DraggableProjectFragment
              key={fragment.id}
              fragment={fragment}
              state={entry.state}
              initial={{
                x: entry.x,
                y: entry.y,
                rotate: entry.rotate,
                z: getStackSlot(fragment.index).z,
              }}
              openLabel={t('openProject')}
              returnLabel={t('returnToFolder')}
              dragEnabled={dragEnabled}
              reducedMotion={reducedMotion}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onReturn={handleReturn}
            />
          );
        })}
      </FolderShell>
      <FolderResetControl label={t('resetFolder')} onReset={reset} disabled={!dirty} />
    </div>
  );
}
