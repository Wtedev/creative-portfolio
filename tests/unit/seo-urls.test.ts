import { describe, expect, it } from 'vitest';

import {
  buildAbsoluteUrl,
  buildLanguageAlternates,
  buildLocalizedPath,
  isProductionSiteUrl,
  isSafeInternalRedirect,
  resolveAbsoluteUrl,
  sanitizeInternalRedirect,
} from '@/lib/seo/urls';

describe('seo urls', () => {
  it('builds locale-specific paths', () => {
    expect(buildLocalizedPath('en', '/')).toBe('/en');
    expect(buildLocalizedPath('ar', '/project/sample-project')).toBe('/ar/project/sample-project');
  });

  it('builds absolute URLs from configured origin', () => {
    expect(buildAbsoluteUrl('en', '/')).toBe('http://localhost:3000/en');
    expect(buildAbsoluteUrl('ar', '/project/sample-project')).toBe(
      'http://localhost:3000/ar/project/sample-project',
    );
  });

  it('resolves relative and absolute media URLs', () => {
    expect(resolveAbsoluteUrl('/og/default.png')).toBe('http://localhost:3000/og/default.png');
    expect(resolveAbsoluteUrl('https://cdn.example.com/image.jpg')).toBe(
      'https://cdn.example.com/image.jpg',
    );
  });

  it('builds hreflang alternates with x-default', () => {
    expect(buildLanguageAlternates('/project/sample-project')).toEqual({
      en: 'http://localhost:3000/en/project/sample-project',
      ar: 'http://localhost:3000/ar/project/sample-project',
      'x-default': 'http://localhost:3000/en/project/sample-project',
    });
  });

  it('rejects unsafe preview redirects', () => {
    expect(isSafeInternalRedirect('https://evil.test', 'en')).toBe(false);
    expect(isSafeInternalRedirect('//evil.test', 'en')).toBe(false);
    expect(isSafeInternalRedirect('/en/project/sample-project', 'en')).toBe(true);
    expect(sanitizeInternalRedirect('https://evil.test', 'en', '/en')).toBe('/en');
    expect(sanitizeInternalRedirect('/ar/project/sample-project', 'en', '/en')).toBe(
      '/ar/project/sample-project',
    );
  });

  it('detects non-production origins', () => {
    expect(isProductionSiteUrl()).toBe(false);
  });
});
