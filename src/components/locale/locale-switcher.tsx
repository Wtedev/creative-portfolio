'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSyncExternalStore } from 'react';

import { Link, usePathname } from '@/i18n/navigation';
import { localeNames } from '@/i18n/config';
import { buildLocaleSwitchHref } from '@/lib/utilities/locale-routing';
import type { Locale } from '@/types/global';

function subscribeToLocation(onStoreChange: () => void) {
  window.addEventListener('hashchange', onStoreChange);
  window.addEventListener('popstate', onStoreChange);
  return () => {
    window.removeEventListener('hashchange', onStoreChange);
    window.removeEventListener('popstate', onStoreChange);
  };
}

function getLocationSuffix() {
  return `${window.location.search}${window.location.hash}`;
}

function getServerLocationSuffix() {
  return '';
}

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations('locale');
  const otherLocale: Locale = locale === 'en' ? 'ar' : 'en';
  const locationSuffix = useSyncExternalStore(
    subscribeToLocation,
    getLocationSuffix,
    getServerLocationSuffix,
  );
  const href = buildLocaleSwitchHref(pathname, locationSuffix);

  return (
    <Link
      href={href}
      locale={otherLocale}
      className="locale-switcher"
      aria-label={t('switchTo', { language: localeNames[otherLocale] })}
    >
      {localeNames[otherLocale]}
    </Link>
  );
}
