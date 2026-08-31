import { getLocale, getTranslations } from 'next-intl/server';

import { Section } from '@/components/ui/section';
import { getLocalizedList, getLocalizedValue } from '@/lib/utilities/locale';
import type { Capability } from '@/types/global';
import type { Locale } from '@/types/global';

type CapabilitiesSectionProps = {
  capabilities: Capability[];
};

export async function CapabilitiesSection({ capabilities }: CapabilitiesSectionProps) {
  const t = await getTranslations('sections');
  const locale = (await getLocale()) as Locale;
  const visible = capabilities.filter((capability) => capability.visible);

  return (
    <Section id="capabilities" title={t('capabilities')} intro={t('capabilitiesIntro')}>
      <ul className="capabilities-grid">
        {visible.map((capability, index) => (
          <li key={capability._id}>
            <article className="capability-card">
              <span className="capability-card__index text-label">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-h3 capability-card__title">
                {getLocalizedValue(capability.title, locale)}
              </h3>
              <p className="text-body capability-card__description">
                {getLocalizedValue(capability.description, locale)}
              </p>
              <ul className="capability-card__items text-small">
                {getLocalizedList(capability.items, locale).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
