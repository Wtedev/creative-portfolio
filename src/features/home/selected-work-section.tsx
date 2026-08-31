import { getLocale, getTranslations } from 'next-intl/server';

import { RevealOnView } from '@/components/motion/reveal-on-view';
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
        {projects.map((project, index) => (
          <RevealOnView
            key={project._id}
            as="li"
            className={gridItemClass(project.cardSize)}
            delay={index * 0.05}
          >
            <ProjectCard project={project} locale={locale} viewLabel={tProject('viewCaseStudy')} />
          </RevealOnView>
        ))}
      </ul>
    </Section>
  );
}
