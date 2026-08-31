export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';
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

export function isValidPublicSiteUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isProductionSiteOrigin(): boolean {
  try {
    const { hostname } = new URL(getSiteUrl());
    return hostname !== 'localhost' && hostname !== '127.0.0.1';
  } catch {
    return false;
  }
}

export function validateProductionEnv(): string[] {
  const warnings: string[] = [];

  if (!isProductionSiteOrigin()) {
    warnings.push('Set NEXT_PUBLIC_SITE_URL to the production domain before launch.');
  }

  if (!isValidPublicSiteUrl(getSiteUrl())) {
    warnings.push('NEXT_PUBLIC_SITE_URL must be a valid absolute http(s) URL.');
  }

  if (!isSanityConfigured()) {
    warnings.push('Sanity is not configured; the site will serve fallback fixtures.');
  }

  return warnings;
}
