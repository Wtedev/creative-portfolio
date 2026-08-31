import { PlaceholderMedia } from '@/components/ui/placeholder-media';
import { Link } from '@/i18n/navigation';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type { ProjectSummary } from '@/types/project';
import type { Locale } from '@/types/global';

type ProjectCardProps = {
  project: ProjectSummary;
  locale: Locale;
  viewLabel: string;
};

export function ProjectCard({ project, locale, viewLabel }: ProjectCardProps) {
  const category = project.categories[0] ?? project.client;

  return (
    <article className="work-card">
      <div className="work-card__media">
        <PlaceholderMedia
          label={getLocalizedValue(project.coverAlt, locale)}
          variant={project.cardSize === 'hero' ? 'wide' : 'landscape'}
        />
      </div>
      <div className="work-card__body">
        <h3 className="text-h3">{getLocalizedValue(project.title, locale)}</h3>
        <p className="text-body">{getLocalizedValue(project.shortDescription, locale)}</p>
        <div className="work-card__meta">
          <span className="work-card__meta-item work-card__category">{category}</span>
          <span className="work-card__meta-item">{project.year}</span>
          <span className="work-card__meta-item">{getLocalizedValue(project.role, locale)}</span>
        </div>
        <div className="work-card__footer">
          <Link href={`/project/${project.slug}`} className="text-link text-link--inline">
            {viewLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
