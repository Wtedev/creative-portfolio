import { getTranslations } from 'next-intl/server';

import { ProjectCoverMedia } from '@/components/media/project-cover-media';
import { Link } from '@/i18n/navigation';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type { ProjectSummary } from '@/types/project';
import type { Locale } from '@/types/global';

type NextProjectSectionProps = {
  nextProject: ProjectSummary;
  locale: Locale;
};

export async function NextProjectSection({ nextProject, locale }: NextProjectSectionProps) {
  const t = await getTranslations('project');
  const category = nextProject.categories[0] ?? nextProject.client;

  return (
    <section className="next-project" aria-labelledby="next-project-heading">
      <div className="next-project__inner">
        <p className="text-label next-project__eyebrow">{t('nextProject')}</p>
        <h2 id="next-project-heading" className="text-h2">
          {getLocalizedValue(nextProject.title, locale)}
        </h2>
        <p className="text-small next-project__meta">
          {category} · {nextProject.year}
        </p>
        <div className="next-project__preview">
          <ProjectCoverMedia
            cover={nextProject.cover}
            alt={getLocalizedValue(nextProject.coverAlt, locale)}
            variant={nextProject.cardSize === 'hero' ? 'wide' : 'landscape'}
          />
        </div>
        <Link href={`/project/${nextProject.slug}`} className="text-link text-link--inline">
          {t('viewCaseStudy')}
        </Link>
      </div>
      <Link href="/#work" className="text-link next-project__back">
        {t('backToWork')}
      </Link>
    </section>
  );
}
