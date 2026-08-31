'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { SiteMotionProvider } from '@/components/motion/site-motion-provider';

type ClientMotionShellProps = {
  children: ReactNode;
};

export function ClientMotionShell({ children }: ClientMotionShellProps) {
  const pathname = usePathname();
  const isHome = /^\/(en|ar)\/?$/.test(pathname);

  return <SiteMotionProvider enableHomeEffects={isHome}>{children}</SiteMotionProvider>;
}
