import type { CSSProperties } from 'react';

import type { HeroDecorativeSheet } from '@/lib/motion/folder-layout';
import { FOLDER_Z, getDecorativeSlot } from '@/lib/motion/folder-layout';

type DecorativeFolderSheetProps = {
  sheet: HeroDecorativeSheet;
  scale?: number;
  rotationScale?: number;
};

export function DecorativeFolderSheet({
  sheet,
  scale = 1,
  rotationScale = 1,
}: DecorativeFolderSheetProps) {
  const slot = getDecorativeSlot(sheet.index);
  const variantClass =
    sheet.index === 0 ? 'folder-decorative-sheet--violet' : 'folder-decorative-sheet--cyan';

  const style = {
    ['--fragment-accent' as string]: sheet.accentColor,
    zIndex: FOLDER_Z.decorative,
    transform: `translate(${slot.x * scale}px, ${slot.y * scale}px) rotate(${slot.rotate * rotationScale}deg)`,
  } as CSSProperties;

  return (
    <div
      className={`folder-decorative-sheet ${variantClass}`.trim()}
      style={style}
      data-sheet={String(sheet.index)}
      aria-hidden="true"
      data-testid={`folder-decorative-${sheet.index}`}
    >
      <div className="folder-card">
        <div className="folder-card__visual">
          <span className="folder-card__grid" />
          <span className="folder-card__frame" />
          <span className="folder-card__line" />
        </div>
        <div className="folder-card__footer">
          <span className="folder-card__dot" />
          <span className="folder-card__rule" />
        </div>
      </div>
    </div>
  );
}
