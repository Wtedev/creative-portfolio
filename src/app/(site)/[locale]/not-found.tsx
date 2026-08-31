import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function LocaleNotFound() {
  const t = await getTranslations('project');

  return (
    <main id="main-content" className="container section-padding">
      <h1 className="text-h1">404</h1>
      <p className="text-body">{t('notFound')}</p>
      <Link href="/">Home</Link>
    </main>
  );
}
