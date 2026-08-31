import { draftMode } from 'next/headers';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CaseStudyBlocks } from '@/features/case-study/case-study-blocks';
import { Link } from '@/i18n/navigation';
import { getProjectDetail, getPublishedProjects } from '@/lib/content/provider';
import { buildCreativeWorkJsonLd, buildPageMetadata } from '@/lib/seo/metadata';
import { formatYear, getLocalizedValue } from '@/lib/utilities/locale';
import { getSiteUrl } from '@/lib/env';
import type { Locale } from '@/types/global';

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { isEnabled } = await draftMode();
  const detail = await getProjectDetail(slug, { preview: isEnabled });
  if (!detail) return {};

  const typedLocale = locale as Locale;

  return buildPageMetadata({
    locale: typedLocale,
    title: getLocalizedValue(detail.project.seoTitle, typedLocale),
    description: getLocalizedValue(detail.project.seoDescription, typedLocale),
    path: `/project/${slug}`,
  });
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();

  return projects.flatMap((project) =>
    ['en', 'ar'].map((locale) => ({
      locale,
      slug: project.slug,
    })),
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { isEnabled } = await draftMode();

  const detail = await getProjectDetail(slug, { preview: isEnabled });
  if (!detail) notFound();

  const typedLocale = locale as Locale;
  const t = await getTranslations('project');
  const { project } = detail;

  const creativeWorkJsonLd = buildCreativeWorkJsonLd({
    name: getLocalizedValue(project.title, typedLocale),
    description: getLocalizedValue(project.shortDescription, typedLocale),
    url: `${getSiteUrl()}/${locale}/project/${slug}`,
    dateCreated: String(project.year),
    creator: getLocalizedValue(detail.siteSettings.professionalTitle, typedLocale),
  });

  return (
    <main id="main-content" className="container section-padding">
      {isEnabled ? (
        <p className="text-label" role="status">
          Preview mode — unpublished changes may be visible.
        </p>
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <Link href="/#work" className="text-small">
        ← {t('backToWork')}
      </Link>
      <header className="project-header">
        <p className="text-label">{t('sampleLabel')}</p>
        <h1 className="text-display">{getLocalizedValue(project.title, typedLocale)}</h1>
        <p className="text-body-lg">{getLocalizedValue(project.shortDescription, typedLocale)}</p>
        <dl className="project-meta">
          <div>
            <dt className="text-label">{t('client')}</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt className="text-label">{t('year')}</dt>
            <dd>{formatYear(project.year, typedLocale)}</dd>
          </div>
          <div>
            <dt className="text-label">{t('role')}</dt>
            <dd>{getLocalizedValue(project.role, typedLocale)}</dd>
          </div>
        </dl>
      </header>
      <CaseStudyBlocks blocks={project.caseStudyBlocks} />
    </main>
  );
}
