import type { ReactNode } from 'react';

type FolderShellProps = {
  label: string;
  children: ReactNode;
};

export function FolderShell({ label, children }: FolderShellProps) {
  return (
    <div className="folder-shell" data-testid="folder-shell">
      <div className="folder-shell__glow" aria-hidden="true" />
      <div className="folder-back" aria-hidden="true">
        <span className="folder-back__tab" />
      </div>
      <div className="folder-stack">{children}</div>
      <div className="folder-front" aria-hidden="true">
        <div className="folder-front__sheen" />
        <div className="folder-front__reflection" />
        <p className="folder-label text-label">{label}</p>
      </div>
    </div>
  );
}
