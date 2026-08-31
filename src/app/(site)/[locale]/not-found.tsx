import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';

export default async function LocaleNotFound() {
  const t = await getTranslations('errors');

  return (
    <main id="main-content" className="container section-padding">
      <h1 className="text-h1">{t('notFoundTitle')}</h1>
      <p className="text-body">{t('notFoundBody')}</p>
      <Link href="/" className="text-link text-link--inline">
        {t('home')}
      </Link>
    </main>
  );
}
