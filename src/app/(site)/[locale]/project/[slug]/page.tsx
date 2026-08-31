import { draftMode } from 'next/headers';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CaseStudyBlocks } from '@/features/case-study/case-study-blocks';
import { NextProjectSection } from '@/features/projects/next-project-section';
import { ProjectFacts } from '@/features/projects/project-facts';
import { ProjectHeroMedia } from '@/features/projects/project-hero-media';
import { Link } from '@/i18n/navigation';
import { getPublishedProjects, getProjectDetail } from '@/lib/content/provider';
import { getNextPublishedProject, toProjectSummary } from '@/lib/content/projects';
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
  const publishedProjects = await getPublishedProjects({ preview: isEnabled });
  const nextProject = getNextPublishedProject(publishedProjects, slug);
  const nextProjectSummary = nextProject ? toProjectSummary(nextProject) : null;
  const category = project.categories[0] ?? project.client;

  const creativeWorkJsonLd = buildCreativeWorkJsonLd({
    name: getLocalizedValue(project.title, typedLocale),
    description: getLocalizedValue(project.shortDescription, typedLocale),
    url: `${getSiteUrl()}/${locale}/project/${slug}`,
    dateCreated: String(project.year),
    creator: getLocalizedValue(detail.siteSettings.professionalTitle, typedLocale),
  });

  return (
    <main id="main-content" className="project-page">
      {isEnabled ? (
        <p className="text-label project-page__preview" role="status">
          {t('previewBanner')}
        </p>
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <div className="container section-padding">
        <nav className="project-page__nav" aria-label={t('backToWork')}>
          <Link href="/#work" className="text-link text-link--inline">
            {t('backToWork')}
          </Link>
        </nav>

        <header className="project-hero">
          <div className="project-hero__copy">
            <p className="text-label project-hero__eyebrow">
              {category} · {formatYear(project.year, typedLocale)}
            </p>
            <h1 className="text-display project-hero__title">
              {getLocalizedValue(project.title, typedLocale)}
            </h1>
            <p className="text-body-lg project-hero__description">
              {getLocalizedValue(project.shortDescription, typedLocale)}
            </p>
          </div>
          <ProjectHeroMedia
            cover={project.cover}
            alt={getLocalizedValue(project.coverAlt, typedLocale)}
            slug={project.slug}
          />
        </header>

        <ProjectFacts project={project} locale={typedLocale} />
        <CaseStudyBlocks blocks={project.caseStudyBlocks} />
        {nextProjectSummary ? (
          <NextProjectSection nextProject={nextProjectSummary} locale={typedLocale} />
        ) : null}
      </div>
    </main>
  );
}
