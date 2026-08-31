/**
 * Stable Sanity document IDs for singleton content types.
 * Used by Studio structure and initial document creation.
 */
export const SINGLETON_IDS = {
  about: 'singleton-about',
  contactAvailability: 'singleton-contact-availability',
  siteSettings: 'singleton-site-settings',
} as const;

export type SingletonDocumentType = keyof typeof SINGLETON_IDS;

export const SINGLETON_SCHEMA_TYPES: Record<SingletonDocumentType, string> = {
  about: 'about',
  contactAvailability: 'contactAvailability',
  siteSettings: 'siteSettings',
};

export function getSingletonDocumentId(type: SingletonDocumentType): string {
  return SINGLETON_IDS[type];
}
