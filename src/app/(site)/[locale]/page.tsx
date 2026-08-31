import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

import { AboutSection } from '@/features/about/about-section';
import { CapabilitiesSection } from '@/features/capabilities/capabilities-section';
import { ContactSection } from '@/features/contact/contact-section';
import { HeroSection } from '@/features/home/hero-section';
import { ProcessSection } from '@/features/home/process-section';
import { SelectedWorkSection } from '@/features/home/selected-work-section';
import { ToolsSection } from '@/features/tools/tools-section';
import { routing } from '@/i18n/routing';
import { getPortfolioContent } from '@/lib/content/provider';
import { getSiteUrl } from '@/lib/env';
import { buildPageMetadata, buildPersonJsonLd } from '@/lib/seo/metadata';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type { Locale } from '@/types/global';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = await getPortfolioContent();
  const typedLocale = locale as Locale;

  return buildPageMetadata({
    locale: typedLocale,
    title: getLocalizedValue(content.siteSettings.seo.title, typedLocale),
    description: getLocalizedValue(content.siteSettings.seo.description, typedLocale),
    path: '/',
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = await getPortfolioContent();
  const typedLocale = locale as Locale;

  const personJsonLd = buildPersonJsonLd({
    name: getLocalizedValue(content.siteSettings.professionalTitle, typedLocale),
    jobTitle: getLocalizedValue(content.siteSettings.professionalTitle, typedLocale),
    url: `${getSiteUrl()}/${locale}`,
    email: content.siteSettings.email,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <main id="main-content">
        <HeroSection settings={content.siteSettings} />
        <SelectedWorkSection projects={content.projects} />
        <CapabilitiesSection capabilities={content.capabilities} />
        <ToolsSection tools={content.tools} />
        <ProcessSection />
        <AboutSection about={content.about} />
        <ContactSection contact={content.contact} />
      </main>
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
