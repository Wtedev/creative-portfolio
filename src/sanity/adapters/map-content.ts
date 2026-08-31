import type {
  AboutContent,
  Capability,
  ContactContent,
  LocalizedString,
  LocalizedText,
  SiteSettings,
  Tool,
  ToolCategory,
} from '@/types/global';
import type { CaseStudyBlock, KnownCaseStudyBlock, Project, ProjectSummary } from '@/types/project';

import type { AspectRatioPreset } from '@/types/project';

import { getFileUrl, getImageUrl } from '@/sanity/lib/image';
import { sortProjectsByOrder } from '@/lib/content/validation';

type SanityLocalized = { en?: string; ar?: string } | null | undefined;
type SanityLocalizedArray = { en?: string[]; ar?: string[] } | null | undefined;

const APPROVED_BLOCK_TYPES = new Set([
  'richText',
  'fullWidthImage',
  'imagePair',
  'imageGrid',
  'video',
  'beforeAndAfter',
  'designPrinciple',
  'quote',
  'metrics',
  'prototypeEmbed',
  'caption',
  'credits',
]);

function mapLocalizedString(value: SanityLocalized, fallback = ''): LocalizedString {
  return {
    en: value?.en?.trim() || fallback,
    ar: value?.ar?.trim() || fallback,
  };
}

function mapLocalizedText(value: SanityLocalized, fallback = ''): LocalizedText {
  return mapLocalizedString(value, fallback);
}

function mapLocalizedArray(value: SanityLocalizedArray): { en: string[]; ar: string[] } {
  return {
    en: value?.en?.filter(Boolean) ?? [],
    ar: value?.ar?.filter(Boolean) ?? [],
  };
}

function mapImage(value: unknown): string | undefined {
  return getImageUrl(value as Parameters<typeof getImageUrl>[0]);
}

function mapCaseStudyBlock(block: Record<string, unknown>): CaseStudyBlock {
  const type = String(block._type ?? 'unknown');
  const key = String(block._key ?? type);

  if (!APPROVED_BLOCK_TYPES.has(type)) {
    return { _type: 'unknownBlock', _key: key, originalType: type };
  }

  switch (type) {
    case 'richText':
      return {
        _type: 'richText',
        _key: key,
        content: {
          en: (block.content as { en?: unknown[] })?.en ?? [],
          ar: (block.content as { ar?: unknown[] })?.ar ?? [],
        },
      };
    case 'fullWidthImage':
      return {
        _type: 'fullWidthImage',
        _key: key,
        image: mapImage(block.image),
        alt: mapLocalizedString(block.alt as SanityLocalized),
        caption: block.caption ? mapLocalizedString(block.caption as SanityLocalized) : undefined,
        aspectRatio: block.aspectRatio as AspectRatioPreset | undefined,
      };
    case 'imagePair':
      return {
        _type: 'imagePair',
        _key: key,
        layout: block.layout as 'equal' | 'first-dominant' | 'second-dominant' | undefined,
        leftImage: mapImage(block.leftImage),
        leftAlt: mapLocalizedString(block.leftAlt as SanityLocalized),
        leftCaption: block.leftCaption
          ? mapLocalizedString(block.leftCaption as SanityLocalized)
          : undefined,
        rightImage: mapImage(block.rightImage),
        rightAlt: mapLocalizedString(block.rightAlt as SanityLocalized),
        rightCaption: block.rightCaption
          ? mapLocalizedString(block.rightCaption as SanityLocalized)
          : undefined,
      };
    case 'imageGrid':
      return {
        _type: 'imageGrid',
        _key: key,
        preset: (block.preset as 'two-up' | 'three-up' | 'four-up') ?? 'two-up',
        images: ((block.images as Array<Record<string, unknown>>) ?? []).map((item, index) => ({
          _key: String(item._key ?? index),
          image: mapImage(item.image),
          alt: mapLocalizedString(item.alt as SanityLocalized),
        })),
      };
    case 'video':
      return {
        _type: 'video',
        _key: key,
        fileUrl: getFileUrl(block.file as Parameters<typeof getFileUrl>[0]),
        externalUrl: block.externalUrl as string | undefined,
        poster: mapImage(block.poster),
        title: block.title ? mapLocalizedString(block.title as SanityLocalized) : undefined,
        description: block.description
          ? mapLocalizedText(block.description as SanityLocalized)
          : undefined,
        fallbackText: mapLocalizedString(block.fallbackText as SanityLocalized),
        autoplay: Boolean(block.autoplay),
        muted: Boolean(block.muted),
        loop: Boolean(block.loop),
      };
    case 'beforeAndAfter':
      return {
        _type: 'beforeAndAfter',
        _key: key,
        beforeImage: mapImage(block.beforeImage),
        afterImage: mapImage(block.afterImage),
        beforeAlt: mapLocalizedString(block.beforeAlt as SanityLocalized),
        afterAlt: mapLocalizedString(block.afterAlt as SanityLocalized),
        beforeLabel: block.beforeLabel
          ? mapLocalizedString(block.beforeLabel as SanityLocalized)
          : undefined,
        afterLabel: block.afterLabel
          ? mapLocalizedString(block.afterLabel as SanityLocalized)
          : undefined,
        caption: block.caption ? mapLocalizedString(block.caption as SanityLocalized) : undefined,
      };
    case 'designPrinciple':
      return {
        _type: 'designPrinciple',
        _key: key,
        title: mapLocalizedString(block.title as SanityLocalized),
        description: mapLocalizedText(block.description as SanityLocalized),
        indexLabel: block.indexLabel
          ? mapLocalizedString(block.indexLabel as SanityLocalized)
          : undefined,
      };
    case 'quote':
      return {
        _type: 'quote',
        _key: key,
        quote: mapLocalizedText(block.quote as SanityLocalized),
        attribution: block.attribution
          ? mapLocalizedString(block.attribution as SanityLocalized)
          : undefined,
      };
    case 'metrics':
      return {
        _type: 'metrics',
        _key: key,
        items: ((block.items as Array<Record<string, unknown>>) ?? []).map((item) => ({
          value: String(item.value ?? ''),
          label: mapLocalizedString(item.label as SanityLocalized),
          context: item.context ? mapLocalizedString(item.context as SanityLocalized) : undefined,
        })),
      };
    case 'prototypeEmbed':
      return {
        _type: 'prototypeEmbed',
        _key: key,
        url: block.url as string | undefined,
        provider: block.provider as 'figma' | 'vimeo' | 'youtube' | 'other' | undefined,
        title: block.title ? mapLocalizedString(block.title as SanityLocalized) : undefined,
        description: block.description
          ? mapLocalizedText(block.description as SanityLocalized)
          : undefined,
        poster: mapImage(block.poster),
      };
    case 'caption':
      return {
        _type: 'caption',
        _key: key,
        text: mapLocalizedString(block.text as SanityLocalized),
      };
    case 'credits':
      return {
        _type: 'credits',
        _key: key,
        items: ((block.items as Array<Record<string, unknown>>) ?? []).map((item) => ({
          role: mapLocalizedString(item.role as SanityLocalized),
          name: String(item.name ?? ''),
          url: item.url as string | undefined,
        })),
      };
    default:
      return { _type: 'unknownBlock', _key: key, originalType: type };
  }
}

function mapCredits(items: Array<Record<string, unknown>> | undefined) {
  return (items ?? []).map((item) => ({
    role: mapLocalizedString(item.role as SanityLocalized),
    name: String(item.name ?? ''),
    url: item.url as string | undefined,
  }));
}

function mapResults(items: Array<Record<string, unknown>> | undefined) {
  return (items ?? []).map((item) => ({
    label: mapLocalizedString(item.label as SanityLocalized),
    value: String(item.value ?? ''),
    context: item.context ? mapLocalizedString(item.context as SanityLocalized) : undefined,
  }));
}

export function mapSanityProject(raw: Record<string, unknown>): Project {
  return {
    _id: String(raw._id ?? ''),
    title: mapLocalizedString(raw.title as SanityLocalized),
    slug: String(raw.slug ?? ''),
    client: String(raw.client ?? ''),
    year: Number(raw.year ?? 0),
    role: mapLocalizedString(raw.role as SanityLocalized),
    categories: (raw.categories as string[]) ?? [],
    services: (raw.services as string[]) ?? [],
    shortDescription: mapLocalizedText(raw.shortDescription as SanityLocalized),
    cover: mapImage(raw.cover),
    coverAlt: mapLocalizedString(raw.coverAlt as SanityLocalized),
    cardSize: (raw.cardSize as Project['cardSize']) ?? 'standard',
    accentColor: raw.accentColor as string | undefined,
    featured: Boolean(raw.featured),
    order: Number(raw.order ?? 0),
    caseStudyBlocks: ((raw.caseStudyBlocks as Array<Record<string, unknown>>) ?? []).map(
      mapCaseStudyBlock,
    ),
    credits: mapCredits(raw.credits as Array<Record<string, unknown>>),
    results: mapResults(raw.results as Array<Record<string, unknown>>),
    seoTitle: mapLocalizedString(raw.seoTitle as SanityLocalized),
    seoDescription: mapLocalizedText(raw.seoDescription as SanityLocalized),
    ogImage: mapImage(raw.ogImage),
    status: (raw.status as Project['status']) ?? 'draft',
  };
}

export function mapSanityProjectSummary(raw: Record<string, unknown>): ProjectSummary {
  const project = mapSanityProject(raw);
  return {
    _id: project._id,
    title: project.title,
    slug: project.slug,
    client: project.client,
    year: project.year,
    role: project.role,
    categories: project.categories,
    shortDescription: project.shortDescription,
    cover: project.cover,
    coverAlt: project.coverAlt,
    cardSize: project.cardSize,
    accentColor: project.accentColor,
    featured: project.featured,
    order: project.order,
    status: project.status,
  };
}

export function mapSanityProjects(rawProjects: Array<Record<string, unknown>>): ProjectSummary[] {
  return sortProjectsByOrder(rawProjects.map(mapSanityProjectSummary));
}

export function mapSanitySiteSettings(raw: Record<string, unknown>): SiteSettings {
  const seo = (raw.seo as Record<string, unknown>) ?? {};

  return {
    siteTitle: String(raw.siteTitle ?? 'Portfolio'),
    professionalTitle: mapLocalizedString(raw.professionalTitle as SanityLocalized),
    heroStatement: mapLocalizedText(raw.heroStatement as SanityLocalized),
    eyebrow: mapLocalizedString(raw.eyebrow as SanityLocalized),
    defaultLocale: (raw.defaultLocale as SiteSettings['defaultLocale']) ?? 'en',
    defaultTheme: (raw.defaultTheme as SiteSettings['defaultTheme']) ?? 'system',
    email: String(raw.email ?? ''),
    linkedin: raw.linkedin as string | undefined,
    seo: {
      title: mapLocalizedString(seo.title as SanityLocalized),
      description: mapLocalizedText(seo.description as SanityLocalized),
      ogImage: mapImage(seo.ogImage),
    },
    socialImage: mapImage(raw.socialImage),
  };
}

export function mapSanityAbout(raw: Record<string, unknown>): AboutContent {
  return {
    shortBio: mapLocalizedText(raw.shortBio as SanityLocalized),
    location: mapLocalizedString(raw.location as SanityLocalized),
    availability: mapLocalizedText(raw.availability as SanityLocalized),
    portrait: mapImage(raw.portrait),
    portraitAlt: raw.portraitAlt
      ? mapLocalizedString(raw.portraitAlt as SanityLocalized)
      : undefined,
    cv: getFileUrl(raw.cv as Parameters<typeof getFileUrl>[0]),
  };
}

export function mapSanityContact(raw: Record<string, unknown>): ContactContent {
  return {
    heading: mapLocalizedString(raw.heading as SanityLocalized),
    body: mapLocalizedText(raw.body as SanityLocalized),
    email: String(raw.email ?? ''),
    linkedin: raw.linkedin as string | undefined,
    location: mapLocalizedString(raw.location as SanityLocalized),
    availabilityStatus:
      (raw.availabilityStatus as ContactContent['availabilityStatus']) ?? 'available',
    availabilityLabel: mapLocalizedString(raw.availabilityLabel as SanityLocalized),
    roleCtaLabel: mapLocalizedString(raw.roleCtaLabel as SanityLocalized),
    projectCtaLabel: mapLocalizedString(raw.projectCtaLabel as SanityLocalized),
    visible: raw.visible !== false,
  };
}

export function mapSanityCapability(raw: Record<string, unknown>): Capability {
  return {
    _id: String(raw._id ?? ''),
    title: mapLocalizedString(raw.title as SanityLocalized),
    description: mapLocalizedText(raw.description as SanityLocalized),
    items: mapLocalizedArray(raw.items as SanityLocalizedArray),
    order: Number(raw.order ?? 0),
    visible: raw.visible !== false,
  };
}

export function mapSanityTool(raw: Record<string, unknown>): Tool {
  return {
    _id: String(raw._id ?? ''),
    name: String(raw.name ?? ''),
    category: (raw.category as ToolCategory) ?? 'design',
    description: mapLocalizedText(raw.description as SanityLocalized),
    proficiency: (raw.proficiency as Tool['proficiency']) ?? 'working',
    icon: raw.icon as string | undefined,
    url: raw.url as string | undefined,
    order: Number(raw.order ?? 0),
    visible: raw.visible !== false,
  };
}

export function isKnownCaseStudyBlock(block: CaseStudyBlock): block is KnownCaseStudyBlock {
  return block._type !== 'unknownBlock';
}
