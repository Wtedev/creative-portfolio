import { caseStudyBlocks, project } from './blocks/case-study';
import { about, capability, contactAvailability, siteSettings, tool } from './documents';
import {
  localizedBlockContent,
  localizedString,
  localizedStringArray,
  localizedText,
} from './objects/localized';

export const schemaTypes = [
  localizedString,
  localizedText,
  localizedBlockContent,
  localizedStringArray,
  ...caseStudyBlocks,
  project,
  tool,
  capability,
  about,
  contactAvailability,
  siteSettings,
];
