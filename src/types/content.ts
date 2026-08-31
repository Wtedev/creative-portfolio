import type { AboutContent, Capability, ContactContent, SiteSettings, Tool } from './global';
import type { Project, ProjectSummary } from './project';

export type PortfolioContent = {
  siteSettings: SiteSettings;
  about: AboutContent;
  contact: ContactContent;
  capabilities: Capability[];
  tools: Tool[];
  projects: ProjectSummary[];
};

export type ProjectDetailContent = {
  project: Project;
  siteSettings: SiteSettings;
  contact: ContactContent;
};

export type ContentSource = 'sanity' | 'fallback';

export type ContentLoadError = 'not-configured' | 'unavailable';

export type ContentMeta = {
  source: ContentSource;
  error?: ContentLoadError;
};

export type PortfolioContentResult = PortfolioContent & ContentMeta;

export type ProjectContentResult = {
  project: Project | null;
  meta: ContentMeta;
};
