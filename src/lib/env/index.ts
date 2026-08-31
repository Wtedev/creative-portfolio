export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}

export function getSanityProjectId(): string | undefined {
  const value = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  return value || undefined;
}

export function getSanityDataset(): string {
  return process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
}

export function getSanityApiVersion(): string {
  return process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01';
}

export function getSanityReadToken(): string | undefined {
  const value = process.env.SANITY_API_READ_TOKEN?.trim();
  return value || undefined;
}

export function getSanityPreviewSecret(): string | undefined {
  const value = process.env.SANITY_PREVIEW_SECRET?.trim();
  return value || undefined;
}

export function isSanityConfigured(): boolean {
  return Boolean(getSanityProjectId());
}

export function isPreviewConfigured(): boolean {
  return Boolean(getSanityPreviewSecret() && getSanityReadToken());
}

export function isPublicEnvVar(name: string): boolean {
  return name.startsWith('NEXT_PUBLIC_');
}
