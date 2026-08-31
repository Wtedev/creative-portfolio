import { getLocale, getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type { ContactContent } from '@/types/global';
import type { Locale } from '@/types/global';

type ContactSectionProps = {
  contact: ContactContent;
};

export async function ContactSection({ contact }: ContactSectionProps) {
  const t = await getTranslations('sections');
  const tContact = await getTranslations('contact');
  const locale = (await getLocale()) as Locale;

  if (!contact.visible) {
    return null;
  }

  return (
    <Section
      id="contact"
      title={getLocalizedValue(contact.heading, locale, t('contact'))}
      luminous="contact"
    >
      <div className="contact-panel">
        <p className="text-body-lg contact-panel__body">
          {getLocalizedValue(contact.body, locale)}
        </p>
        <div className="contact-panel__actions">
          <Button
            href={`mailto:${contact.email}?subject=${encodeURIComponent(getLocalizedValue(contact.roleCtaLabel, locale))}`}
          >
            {getLocalizedValue(contact.roleCtaLabel, locale)}
          </Button>
          <Button
            href={`mailto:${contact.email}?subject=${encodeURIComponent(getLocalizedValue(contact.projectCtaLabel, locale))}`}
            variant="secondary"
          >
            {getLocalizedValue(contact.projectCtaLabel, locale)}
          </Button>
        </div>
        <ul className="contact-panel__links">
          <li className="contact-panel__link-row">
            <span className="text-label">{tContact('email')}</span>
            <a href={`mailto:${contact.email}`} className="text-link">
              {contact.email}
            </a>
          </li>
          {contact.linkedin ? (
            <li className="contact-panel__link-row">
              <span className="text-label">{tContact('linkedin')}</span>
              <a href={contact.linkedin} rel="noopener noreferrer" className="text-link">
                LinkedIn
              </a>
            </li>
          ) : null}
          <li className="contact-panel__link-row">
            <span className="text-label">{tContact('availability')}</span>
            <span className="availability-badge">
              {getLocalizedValue(contact.availabilityLabel, locale)}
            </span>
          </li>
        </ul>
      </div>
    </Section>
  );
}
