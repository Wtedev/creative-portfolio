import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function ProjectNotFound() {
  const t = await getTranslations('project');

  return (
    <main id="main-content" className="container section-padding">
      <h1 className="text-h1">{t('notFound')}</h1>
      <Link href="/#work">← {t('backToWork')}</Link>
    </main>
  );
}
