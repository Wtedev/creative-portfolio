import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

import { StructuredData } from '@/components/seo/structured-data';
import { AboutSection } from '@/features/about/about-section';
import { CapabilitiesSection } from '@/features/capabilities/capabilities-section';
import { ContactSection } from '@/features/contact/contact-section';
import { HeroSection } from '@/features/home/hero-section';
import { ProcessSection } from '@/features/home/process-section';
import { SelectedWorkSection } from '@/features/home/selected-work-section';
import { ToolsSection } from '@/features/tools/tools-section';
import { routing } from '@/i18n/routing';
import { getPortfolioContent } from '@/lib/content/provider';
import { buildPageMetadata, buildPersonJsonLd, buildWebsiteJsonLd } from '@/lib/seo/metadata';
import { buildAbsoluteUrl } from '@/lib/seo/urls';
import { getLocalizedValue } from '@/lib/utilities/locale';
import type { Locale } from '@/types/global';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = await getPortfolioContent();
  const typedLocale = locale as Locale;
  const ogImage = content.siteSettings.socialImage ?? content.siteSettings.seo.ogImage;

  return buildPageMetadata({
    locale: typedLocale,
    title: getLocalizedValue(content.siteSettings.seo.title, typedLocale),
    description: getLocalizedValue(content.siteSettings.seo.description, typedLocale),
    path: '/',
    ogImage,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = await getPortfolioContent();
  const typedLocale = locale as Locale;
  const pageUrl = buildAbsoluteUrl(typedLocale, '/');
  const siteTitle = getLocalizedValue(content.siteSettings.seo.title, typedLocale);
  const siteDescription = getLocalizedValue(content.siteSettings.seo.description, typedLocale);
  const professionalTitle = getLocalizedValue(content.siteSettings.professionalTitle, typedLocale);

  const personJsonLd = buildPersonJsonLd({
    name: professionalTitle,
    jobTitle: professionalTitle,
    url: pageUrl,
    email: content.siteSettings.email,
  });

  const websiteJsonLd = buildWebsiteJsonLd({
    name: siteTitle,
    url: pageUrl,
    description: siteDescription,
  });

  return (
    <>
      <StructuredData data={personJsonLd} />
      <StructuredData data={websiteJsonLd} />
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
