import { ProjectCardMedia } from '@/components/motion/project-card-media';
import { Link } from '@/i18n/navigation';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type { ProjectSummary } from '@/types/project';
import type { Locale } from '@/types/global';

type ProjectCardProps = {
  project: ProjectSummary;
  locale: Locale;
  viewLabel: string;
};

export async function ProjectCard({ project, locale, viewLabel }: ProjectCardProps) {
  const category = project.categories[0] ?? project.client;
  const accentStyle = project.accentColor
    ? ({ ['--project-accent' as string]: project.accentColor } as React.CSSProperties)
    : undefined;

  return (
    <Link
      href={`/project/${project.slug}`}
      className="work-card work-card--link"
      style={accentStyle}
    >
      <div className="work-card__media">
        <ProjectCardMedia
          slug={project.slug}
          cover={project.cover}
          alt={getLocalizedValue(project.coverAlt, locale)}
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
          <span className="text-link text-link--inline work-card__action">{viewLabel}</span>
        </div>
      </div>
    </Link>
  );
}
