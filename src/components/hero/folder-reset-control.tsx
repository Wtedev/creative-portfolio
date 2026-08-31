'use client';

type FolderResetControlProps = {
  label: string;
  onReset: () => void;
  disabled?: boolean;
};

export function FolderResetControl({ label, onReset, disabled }: FolderResetControlProps) {
  return (
    <button
      type="button"
      className="folder-reset"
      onClick={onReset}
      disabled={disabled}
      data-testid="folder-reset"
    >
      {label}
    </button>
  );
}
