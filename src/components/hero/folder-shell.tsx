import type { ReactNode } from 'react';

type FolderShellProps = {
  label: string;
  dragging?: boolean;
  children: ReactNode;
};

export function FolderShell({ label, dragging = false, children }: FolderShellProps) {
  return (
    <div
      className="folder-shell"
      data-dragging={dragging ? 'true' : 'false'}
      data-testid="folder-shell"
    >
      <div className="folder-shell__glow" aria-hidden="true" />
      <div className="folder-shell__base" aria-hidden="true" />
      <div className="folder-back" aria-hidden="true">
        <span className="folder-back__tab" />
        <span className="folder-back__diffusion" />
      </div>
      <div className="folder-stack">{children}</div>
      <div className="folder-front" aria-hidden="true">
        <div className="folder-front__sheen" />
        <div className="folder-front__reflection" />
        <div className="folder-front__edge" />
        <p className="folder-label text-label">{label}</p>
      </div>
    </div>
  );
}
