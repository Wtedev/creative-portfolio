import { getTranslations } from 'next-intl/server';

import { Section } from '@/components/ui/section';

const processStepKeys = ['frame', 'language', 'system', 'life'] as const;

export async function ProcessSection() {
  const t = await getTranslations('sections');
  const tProcess = await getTranslations('process');

  return (
    <Section id="process" title={t('process')} intro={t('processIntro')}>
      <ol className="process-flow">
        {processStepKeys.map((key, index) => (
          <li key={key}>
            <article className="process-step">
              <span className="process-step__number">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="process-step__title">{tProcess(`steps.${key}.title`)}</h3>
              <p className="text-body">{tProcess(`steps.${key}.description`)}</p>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
