'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { useSyncExternalStore } from 'react';

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const t = useTranslations('theme');
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const cycleTheme = () => {
    const order = ['system', 'light', 'dark'] as const;
    const current = (theme ?? 'system') as (typeof order)[number];
    const nextIndex = (order.indexOf(current) + 1) % order.length;
    setTheme(order[nextIndex]);
  };

  const label = theme === 'light' ? t('light') : theme === 'dark' ? t('dark') : t('system');

  if (!mounted) {
    return (
      <button type="button" className="theme-toggle" aria-label={t('label')} disabled>
        …
      </button>
    );
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cycleTheme}
      aria-label={`${t('label')}: ${label}`}
      title={`${t('label')}: ${label}`}
    >
      {resolvedTheme === 'dark' ? '◐' : '◑'} {label}
    </button>
  );
}
