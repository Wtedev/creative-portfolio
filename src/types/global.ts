export type Locale = 'en' | 'ar';

export type LocalizedString = {
  en: string;
  ar: string;
};

export type LocalizedText = {
  en: string;
  ar: string;
};

export type LocalizedPortableText = {
  en: unknown[];
  ar: unknown[];
};

export type ThemePreference = 'light' | 'dark' | 'system';

export type PublicationStatus = 'draft' | 'ready' | 'published' | 'archived';

export type CardSize = 'standard' | 'wide' | 'hero';

export type ToolCategory = 'direction' | 'design' | 'build' | 'motion' | 'ai';

export type Proficiency = 'working' | 'comfortable' | 'exploring';

export type AvailabilityStatus = 'available' | 'selected-opportunities' | 'unavailable';

export type SeoFields = {
  title: LocalizedString;
  description: LocalizedString;
  ogImage?: string;
};

export type Credit = {
  role: LocalizedString;
  name: string;
  url?: string;
};

export type ResultMetric = {
  label: LocalizedString;
  value: string;
  context?: LocalizedString;
};

export type SiteSettings = {
  siteTitle: string;
  professionalTitle: LocalizedString;
  heroStatement: LocalizedString;
  eyebrow: LocalizedString;
  defaultLocale: Locale;
  defaultTheme: ThemePreference;
  email: string;
  linkedin?: string;
  seo: SeoFields;
  socialImage?: string;
};

export type AboutContent = {
  shortBio: LocalizedText;
  location: LocalizedString;
  availability: LocalizedText;
  portrait?: string;
  portraitAlt?: LocalizedString;
  cv?: string;
};

export type ContactContent = {
  heading: LocalizedString;
  body: LocalizedText;
  email: string;
  linkedin?: string;
  location: LocalizedString;
  availabilityStatus: AvailabilityStatus;
  availabilityLabel: LocalizedString;
  roleCtaLabel: LocalizedString;
  projectCtaLabel: LocalizedString;
  visible: boolean;
};

export type Capability = {
  _id: string;
  title: LocalizedString;
  description: LocalizedString;
  items: { en: string[]; ar: string[] };
  order: number;
  visible: boolean;
};

export type Tool = {
  _id: string;
  name: string;
  category: ToolCategory;
  description: LocalizedString;
  proficiency: Proficiency;
  icon?: string;
  url?: string;
  order: number;
  visible: boolean;
};
