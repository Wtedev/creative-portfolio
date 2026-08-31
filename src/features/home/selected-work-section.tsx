import { getLocale, getTranslations } from 'next-intl/server';

import { Section } from '@/components/ui/section';
import { ProjectCard } from '@/features/projects/project-card';
import type { ProjectSummary } from '@/types/project';
import type { Locale } from '@/types/global';

type SelectedWorkSectionProps = {
  projects: ProjectSummary[];
};

function gridItemClass(cardSize: ProjectSummary['cardSize']): string {
  if (cardSize === 'hero') return 'work-grid__item--hero';
  if (cardSize === 'wide') return 'work-grid__item--wide';
  return '';
}

export async function SelectedWorkSection({ projects }: SelectedWorkSectionProps) {
  const t = await getTranslations('sections');
  const tProject = await getTranslations('project');
  const locale = (await getLocale()) as Locale;

  return (
    <Section id="work" title={t('work')} intro={t('workIntro')} luminous="work">
      <ul className="work-grid">
        {projects.map((project) => (
          <li key={project._id} className={gridItemClass(project.cardSize)}>
            <ProjectCard project={project} locale={locale} viewLabel={tProject('viewCaseStudy')} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
