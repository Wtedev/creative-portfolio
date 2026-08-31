import { getLocale, getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import type { SiteSettings } from '@/types/global';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type { Locale } from '@/types/global';

type HeroSectionProps = {
  settings: SiteSettings;
};

export async function HeroSection({ settings }: HeroSectionProps) {
  const t = await getTranslations('hero');
  const locale = (await getLocale()) as Locale;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="hero luminous-section luminous-section--hero section-padding"
    >
      <Container>
        <div className="hero__grid">
          <Eyebrow>{getLocalizedValue(settings.eyebrow, locale, t('eyebrow'))}</Eyebrow>
          <h1 id="hero-heading" className="text-display hero__title">
            {t('title')}
          </h1>
          <p className="text-body-lg hero__statement">{t('statement')}</p>
          <div className="hero__actions">
            <Button href="#contact">{t('discussRole')}</Button>
            <Button href="#contact" variant="secondary">
              {t('startProject')}
            </Button>
          </div>
          <div className="hero__explore">
            <a href="#work" className="text-link text-link--inline">
              {t('exploreWork')}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
