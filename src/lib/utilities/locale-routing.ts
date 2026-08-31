/**
 * Preserve search + hash when switching locales on the client.
 * Pathname from next-intl is locale-stripped and excludes search/hash.
 */
export function buildLocaleSwitchHref(pathname: string, locationSuffix: string): string {
  const safePath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${safePath}${locationSuffix}`;
}

/**
 * Split a window location suffix into search and hash for tests and callers.
 */
export function buildLocaleSwitchHrefParts(pathname: string, search: string, hash: string): string {
  return buildLocaleSwitchHref(pathname, `${search}${hash}`);
}

/** Latin numerals for years/metrics in both locales (technical readability). */
export function shouldUseLatinNumerals(): boolean {
  return true;
}
