import type { ReactNode } from 'react';

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className = '' }: EyebrowProps) {
  return <p className={`text-label eyebrow ${className}`.trim()}>{children}</p>;
}
