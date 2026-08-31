import { getLocale, getTranslations } from 'next-intl/server';

import { LocaleSwitcher } from '@/components/locale/locale-switcher';
import { Container } from '@/components/ui/container';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type { SiteSettings } from '@/types/global';
import type { Locale } from '@/types/global';

type SiteFooterProps = {
  settings: SiteSettings;
};

export async function SiteFooter({ settings }: SiteFooterProps) {
  const t = await getTranslations('footer');
  const tContact = await getTranslations('contact');
  const locale = (await getLocale()) as Locale;
  const year = new Date().getFullYear();
  const professionalTitle = getLocalizedValue(settings.professionalTitle, locale);

  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__inner">
          <div className="site-footer__top">
            <div className="site-footer__brand">
              <p className="site-footer__title">{settings.siteTitle}</p>
              <p className="site-footer__subtitle">{professionalTitle}</p>
            </div>
            <ul className="site-footer__links">
              <li>
                <a href={`mailto:${settings.email}`}>{tContact('email')}</a>
              </li>
              {settings.linkedin ? (
                <li>
                  <a href={settings.linkedin} rel="noopener noreferrer">
                    {tContact('linkedin')}
                  </a>
                </li>
              ) : null}
              <li>
                <a href="#main-content">{t('backToTop')}</a>
              </li>
            </ul>
          </div>
          <div className="site-footer__bottom">
            <p>{t('copyright', { year, name: settings.siteTitle })}</p>
            <div className="site-footer__controls">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
