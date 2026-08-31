import { getLocale, getTranslations } from 'next-intl/server';

import { FolderScene } from '@/components/hero/folder-scene';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { buildHeroFolderContent, filterPublishedSummaries } from '@/lib/content/hero-fragments';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type { Locale, SiteSettings } from '@/types/global';
import type { ProjectSummary } from '@/types/project';

type HeroSectionProps = {
  settings: SiteSettings;
  projects: ProjectSummary[];
};

export async function HeroSection({ settings, projects }: HeroSectionProps) {
  const t = await getTranslations('hero');
  const locale = (await getLocale()) as Locale;
  const published = filterPublishedSummaries(projects);
  const folderContent = buildHeroFolderContent(published, locale);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="folder-hero luminous-section luminous-section--hero"
    >
      <Container>
        <div className="folder-hero__content">
          <Eyebrow>{getLocalizedValue(settings.eyebrow, locale, t('eyebrow'))}</Eyebrow>

          <h1 id="hero-heading" className="folder-hero__title">
            <span className="folder-hero__title-serif">{t('titleSerif')}</span>
            <span className="folder-hero__title-sans">
              {locale === 'en' ? (
                <>
                  <span className="folder-hero__amp">&amp;</span>
                  {t('titleSans')}
                </>
              ) : (
                t('titleSans')
              )}
            </span>
          </h1>

          <div className="folder-hero__visual">
            <FolderScene content={folderContent} />
          </div>

          <a href="#work" className="folder-hero__explore text-link">
            {t('exploreWork')}
            <span className="folder-hero__explore-arrow" aria-hidden="true">
              ↓
            </span>
          </a>

          <p className="text-body-lg folder-hero__statement">{t('statement')}</p>

          <div className="folder-hero__actions">
            <Button href="#contact">{t('discussRole')}</Button>
            <Button href="#contact" variant="secondary">
              {t('startProject')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
