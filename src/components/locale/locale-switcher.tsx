'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import { localeNames } from '@/i18n/config';
import type { Locale } from '@/types/global';

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations('locale');
  const otherLocale: Locale = locale === 'en' ? 'ar' : 'en';

  return (
    <Link
      href={pathname}
      locale={otherLocale}
      className="locale-switcher"
      aria-label={t('switchTo', { language: localeNames[otherLocale] })}
    >
      {localeNames[otherLocale]}
    </Link>
  );
}
