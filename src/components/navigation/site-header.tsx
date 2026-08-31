'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { LocaleSwitcher } from '@/components/locale/locale-switcher';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const navItems = [
  { href: '#work', key: 'work' },
  { href: '#capabilities', key: 'capabilities' },
  { href: '#tools', key: 'tools' },
  { href: '#process', key: 'process' },
  { href: '#about', key: 'about' },
  { href: '#contact', key: 'contact' },
] as const;

const sectionIds = navItems.map((item) => item.href.slice(1));

type SiteHeaderProps = {
  siteTitle: string;
};

export function SiteHeader({ siteTitle }: SiteHeaderProps) {
  const t = useTranslations('navigation');
  const tHero = useTranslations('hero');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    if (menuOpen) {
      setMenuOpen(false);
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.removeProperty('overflow');
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), select, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled ? 'true' : 'false'}>
      <Container>
        <div className="site-header__inner">
          <a href="#" className="site-header__brand">
            {siteTitle}
          </a>

          <nav className="site-header__nav" aria-label={t('primary')}>
            <ul className="site-header__nav-list">
              {navItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="site-header__nav-link"
                    aria-current={activeSection === item.href.slice(1) ? 'true' : undefined}
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__controls">
            <Button href="#contact" variant="compact" className="site-header__contact-cta">
              {t('contact')}
            </Button>
            <LocaleSwitcher />
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              className="site-header__menu-toggle"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="visually-hidden">{menuOpen ? t('closeMenu') : t('openMenu')}</span>
              <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
            </button>
          </div>
        </div>
      </Container>

      <div ref={panelRef} id={menuId} className="site-header__mobile-panel" hidden={!menuOpen}>
        <Container>
          <nav aria-label={t('primary')}>
            <ul className="site-header__mobile-nav-list">
              {navItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="site-header__mobile-nav-link"
                    aria-current={activeSection === item.href.slice(1) ? 'true' : undefined}
                    onClick={closeMenu}
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="site-header__mobile-controls">
            <Button href="#contact" variant="secondary" onClick={closeMenu}>
              {tHero('discussRole')}
            </Button>
            <Button href="#contact" variant="primary" onClick={closeMenu}>
              {tHero('startProject')}
            </Button>
            <div onClick={closeMenu}>
              <LocaleSwitcher />
            </div>
            <ThemeToggle />
          </div>
        </Container>
      </div>
    </header>
  );
}
