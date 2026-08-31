import type { CSSProperties } from 'react';

import type { HeroDecorativeSheet } from '@/lib/motion/folder-layout';
import { getStackSlot } from '@/lib/motion/folder-layout';

type DecorativeFolderSheetProps = {
  sheet: HeroDecorativeSheet;
  scale?: number;
};

export function DecorativeFolderSheet({ sheet, scale = 1 }: DecorativeFolderSheetProps) {
  const slot = getStackSlot(sheet.index);

  const style = {
    ['--fragment-accent' as string]: sheet.accentColor,
    zIndex: slot.z,
    transform: `translate(${slot.x * scale}px, ${slot.y * scale}px) rotate(${slot.rotate}deg)`,
  } as CSSProperties;

  return (
    <div
      className="folder-decorative-sheet"
      style={style}
      aria-hidden="true"
      data-testid={`folder-decorative-${sheet.index}`}
    />
  );
}
