import type {
  CardSize,
  Credit,
  LocalizedPortableText,
  LocalizedString,
  LocalizedText,
  PublicationStatus,
  ResultMetric,
} from './global';

export type AspectRatioPreset = 'landscape' | 'square' | 'portrait' | 'wide';

export type ImagePairLayout = 'equal' | 'first-dominant' | 'second-dominant';

export type ImageGridPreset = 'two-up' | 'three-up' | 'four-up';

export type PrototypeProvider = 'figma' | 'vimeo' | 'youtube' | 'other';

export type UnknownCaseStudyBlock = {
  _type: 'unknownBlock';
  _key: string;
  originalType?: string;
};

export type KnownCaseStudyBlock =
  | RichTextBlock
  | FullWidthImageBlock
  | ImagePairBlock
  | ImageGridBlock
  | VideoBlock
  | BeforeAfterBlock
  | DesignPrincipleBlock
  | QuoteBlock
  | MetricsBlock
  | PrototypeEmbedBlock
  | CaptionBlock
  | CreditsBlock;

export type CaseStudyBlock = KnownCaseStudyBlock | UnknownCaseStudyBlock;

export type RichTextBlock = {
  _type: 'richText';
  _key: string;
  content: LocalizedPortableText;
};

export type FullWidthImageBlock = {
  _type: 'fullWidthImage';
  _key: string;
  image?: string;
  alt: LocalizedString;
  caption?: LocalizedString;
  aspectRatio?: AspectRatioPreset;
};

export type ImagePairBlock = {
  _type: 'imagePair';
  _key: string;
  layout?: ImagePairLayout;
  leftImage?: string;
  leftAlt: LocalizedString;
  leftCaption?: LocalizedString;
  rightImage?: string;
  rightAlt: LocalizedString;
  rightCaption?: LocalizedString;
};

export type ImageGridBlock = {
  _type: 'imageGrid';
  _key: string;
  preset: ImageGridPreset;
  images: Array<{
    _key: string;
    image?: string;
    alt: LocalizedString;
  }>;
};

export type VideoBlock = {
  _type: 'video';
  _key: string;
  fileUrl?: string;
  externalUrl?: string;
  poster?: string;
  title?: LocalizedString;
  description?: LocalizedText;
  fallbackText: LocalizedString;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
};

export type BeforeAfterBlock = {
  _type: 'beforeAndAfter';
  _key: string;
  beforeImage?: string;
  afterImage?: string;
  beforeAlt: LocalizedString;
  afterAlt: LocalizedString;
  beforeLabel?: LocalizedString;
  afterLabel?: LocalizedString;
  caption?: LocalizedString;
};

export type DesignPrincipleBlock = {
  _type: 'designPrinciple';
  _key: string;
  title: LocalizedString;
  description: LocalizedText;
  indexLabel?: LocalizedString;
};

export type QuoteBlock = {
  _type: 'quote';
  _key: string;
  quote: LocalizedText;
  attribution?: LocalizedString;
};

export type MetricsBlock = {
  _type: 'metrics';
  _key: string;
  items: ResultMetric[];
};

export type PrototypeEmbedBlock = {
  _type: 'prototypeEmbed';
  _key: string;
  url?: string;
  provider?: PrototypeProvider;
  title?: LocalizedString;
  description?: LocalizedText;
  poster?: string;
};

export type CaptionBlock = {
  _type: 'caption';
  _key: string;
  text: LocalizedString;
};

export type CreditsBlock = {
  _type: 'credits';
  _key: string;
  items: Credit[];
};

export type Project = {
  _id: string;
  title: LocalizedString;
  slug: string;
  client: string;
  year: number;
  role: LocalizedString;
  categories: string[];
  services: string[];
  shortDescription: LocalizedText;
  cover?: string;
  coverAlt: LocalizedString;
  cardSize: CardSize;
  accentColor?: string;
  featured: boolean;
  order: number;
  caseStudyBlocks: CaseStudyBlock[];
  credits: Credit[];
  results: ResultMetric[];
  seoTitle: LocalizedString;
  seoDescription: LocalizedText;
  ogImage?: string;
  status: PublicationStatus;
};

export type ProjectSummary = Pick<
  Project,
  | '_id'
  | 'title'
  | 'slug'
  | 'client'
  | 'year'
  | 'role'
  | 'categories'
  | 'shortDescription'
  | 'cover'
  | 'coverAlt'
  | 'cardSize'
  | 'accentColor'
  | 'featured'
  | 'order'
  | 'status'
>;

export type SitemapProjectEntry = {
  slug: string;
  _updatedAt?: string;
};
