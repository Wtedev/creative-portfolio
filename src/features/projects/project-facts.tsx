import { getTranslations } from 'next-intl/server';

import { formatYear, getLocalizedValue } from '@/lib/utilities/locale';
import type { Project } from '@/types/project';
import type { Locale } from '@/types/global';

type ProjectFactsProps = {
  project: Project;
  locale: Locale;
};

export async function ProjectFacts({ project, locale }: ProjectFactsProps) {
  const t = await getTranslations('project');

  const facts = [
    project.client ? { label: t('client'), value: project.client } : null,
    { label: t('year'), value: formatYear(project.year, locale) },
    { label: t('role'), value: getLocalizedValue(project.role, locale) },
    project.categories.length
      ? { label: t('categories'), value: project.categories.join(' · ') }
      : null,
    project.services.length ? { label: t('services'), value: project.services.join(' · ') } : null,
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact?.value));

  return (
    <dl className="project-facts">
      {facts.map((fact) => (
        <div key={fact.label} className="project-facts__item">
          <dt className="text-label project-facts__label">{fact.label}</dt>
          <dd className="text-body project-facts__value">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
