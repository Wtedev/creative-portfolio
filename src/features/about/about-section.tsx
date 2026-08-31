import { getLocale, getTranslations } from 'next-intl/server';

import { PlaceholderMedia } from '@/components/ui/placeholder-media';
import { Section } from '@/components/ui/section';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type { AboutContent } from '@/types/global';
import type { Locale } from '@/types/global';

type AboutSectionProps = {
  about: AboutContent;
};

export async function AboutSection({ about }: AboutSectionProps) {
  const t = await getTranslations('sections');
  const tAbout = await getTranslations('about');
  const locale = (await getLocale()) as Locale;

  return (
    <Section id="about" title={t('about')} intro={t('aboutIntro')} luminous="about">
      <div className="about-layout">
        {about.portrait ? (
          <div className="about-layout__portrait">
            <PlaceholderMedia
              label={getLocalizedValue(about.portraitAlt, locale, tAbout('portraitAlt'))}
              variant="portrait"
            />
          </div>
        ) : null}
        <div>
          <p className="text-body-lg about-layout__bio">
            {getLocalizedValue(about.shortBio, locale)}
          </p>
          <dl className="about-meta">
            <div className="about-meta__item">
              <dt className="text-label about-meta__label">{tAbout('location')}</dt>
              <dd className="text-body">{getLocalizedValue(about.location, locale)}</dd>
            </div>
            <div className="about-meta__item">
              <dt className="text-label about-meta__label">{tAbout('availability')}</dt>
              <dd className="text-body">{getLocalizedValue(about.availability, locale)}</dd>
            </div>
            <div className="about-meta__item">
              <dt className="text-label about-meta__label">{tAbout('focus')}</dt>
              <dd className="text-body">{tAbout('focusValue')}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}
