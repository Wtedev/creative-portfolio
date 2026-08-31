import { getLocale, getTranslations } from 'next-intl/server';

import { Section } from '@/components/ui/section';
import { ToolsScroller } from '@/components/ui/tools-scroller';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type { Tool, ToolCategory } from '@/types/global';
import type { Locale } from '@/types/global';

type ToolsSectionProps = {
  tools: Tool[];
};

const categoryKeys: Record<ToolCategory, string> = {
  direction: 'direction',
  design: 'design',
  build: 'build',
  motion: 'motion',
  ai: 'ai',
};

export async function ToolsSection({ tools }: ToolsSectionProps) {
  const t = await getTranslations('sections');
  const tTools = await getTranslations('tools');
  const locale = (await getLocale()) as Locale;
  const visible = tools.filter((tool) => tool.visible);

  return (
    <Section id="tools" title={t('tools')} intro={t('toolsIntro')} luminous="tools">
      <ToolsScroller
        prevLabel={tTools('scrollPrev')}
        nextLabel={tTools('scrollNext')}
        trackLabel={tTools('trackLabel')}
      >
        {visible.map((tool) => (
          <article key={tool._id} className="tool-card">
            <h3 className="text-h3">{tool.name}</h3>
            <p className="text-label tool-card__category">
              {tTools(`categories.${categoryKeys[tool.category]}`)}
            </p>
            <p className="text-body">{getLocalizedValue(tool.description, locale)}</p>
            <p className="tool-card__proficiency">{tTools(`proficiency.${tool.proficiency}`)}</p>
          </article>
        ))}
      </ToolsScroller>
    </Section>
  );
}
