import type { CSSProperties } from 'react';

import type { HeroDecorativeSheet } from '@/lib/motion/folder-layout';
import { FOLDER_Z, getDecorativeSlot } from '@/lib/motion/folder-layout';

type DecorativeFolderSheetProps = {
  sheet: HeroDecorativeSheet;
  scale?: number;
};

export function DecorativeFolderSheet({ sheet, scale = 1 }: DecorativeFolderSheetProps) {
  const slot = getDecorativeSlot(sheet.index);
  const variantClass =
    sheet.index % 2 === 0 ? 'folder-decorative-sheet--a' : 'folder-decorative-sheet--b';

  const style = {
    ['--fragment-accent' as string]: sheet.accentColor,
    zIndex: FOLDER_Z.decorative,
    transform: `translate(${slot.x * scale}px, ${slot.y * scale}px) rotate(${slot.rotate * (scale < 1 ? 0.65 : 1)}deg)`,
  } as CSSProperties;

  return (
    <div
      className={`folder-decorative-sheet ${variantClass}`.trim()}
      style={style}
      data-sheet={String(sheet.index)}
      aria-hidden="true"
      data-testid={`folder-decorative-${sheet.index}`}
    >
      {sheet.index % 2 === 0 ? <span className="folder-decorative-sheet__line" /> : null}
      <span className="folder-decorative-sheet__mark" />
    </div>
  );
}
