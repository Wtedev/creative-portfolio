import type { ReactNode } from 'react';

type FolderShellProps = {
  label: string;
  dragging?: boolean;
  children: ReactNode;
};

/** Back silhouette with attached tab — 640×420 coordinate system. */
const FOLDER_BACK_PATH =
  'M 64 94 Q 40 94 40 120 L 40 370 Q 40 396 66 396 L 574 396 Q 600 396 600 370 L 600 122 Q 600 96 574 96 L 430 96 L 394 54 Q 385 44 368 44 L 240 44 Q 223 44 214 56 L 184 94 Z';

const FOLDER_BACK_HIGHLIGHT =
  'M 72 108 Q 52 108 52 128 L 52 358 Q 52 378 72 378 L 568 378 Q 588 378 588 358 L 588 128 Q 588 108 568 108 L 428 108 L 398 68 Q 390 58 372 58 L 248 58 Q 230 58 222 68 L 196 94';

/** Front pocket — lower ~40% of folder height. */
const FOLDER_POCKET_PATH =
  'M 44 238 Q 44 218 66 218 L 574 218 Q 596 218 596 240 L 596 366 Q 596 394 568 394 L 72 394 Q 44 394 44 366 Z';

const FOLDER_POCKET_LIP = 'M 68 218 Q 320 208 572 218';

const FOLDER_POCKET_REFLECTION = 'M 52 248 L 588 248 L 588 262 L 52 278 Z';

export function FolderShell({ label, dragging = false, children }: FolderShellProps) {
  return (
    <div
      className="folder-shell"
      data-dragging={dragging ? 'true' : 'false'}
      data-testid="folder-shell"
    >
      <div className="folder-shell__glow" aria-hidden="true" />

      <svg
        className="folder-surface folder-surface--back"
        viewBox="0 0 640 420"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="folder-back-gradient" x1="320" y1="44" x2="320" y2="396">
            <stop offset="0%" stopColor="var(--folder-back-start)" />
            <stop offset="100%" stopColor="var(--folder-back-end)" />
          </linearGradient>
        </defs>
        <path
          className="folder-back-shape"
          d={FOLDER_BACK_PATH}
          fill="url(#folder-back-gradient)"
        />
        <path
          className="folder-back-highlight"
          d={FOLDER_BACK_HIGHLIGHT}
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="folder-stack">{children}</div>

      <svg
        className="folder-surface folder-surface--front"
        viewBox="0 0 640 420"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="folder-front-gradient" x1="320" y1="218" x2="320" y2="394">
            <stop offset="0%" stopColor="var(--folder-front-start)" />
            <stop offset="100%" stopColor="var(--folder-front-end)" />
          </linearGradient>
        </defs>
        <path
          className="folder-pocket-shape"
          d={FOLDER_POCKET_PATH}
          fill="url(#folder-front-gradient)"
        />
        <path
          className="folder-pocket-lip"
          d={FOLDER_POCKET_LIP}
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <path className="folder-pocket-reflection" d={FOLDER_POCKET_REFLECTION} />
      </svg>

      <span className="folder-label text-label">{label}</span>
    </div>
  );
}
