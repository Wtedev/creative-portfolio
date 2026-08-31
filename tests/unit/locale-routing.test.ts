import { describe, expect, it } from 'vitest';

import { buildLocaleSwitchHref, buildLocaleSwitchHrefParts } from '@/lib/utilities/locale-routing';
import { formatYear } from '@/lib/utilities/locale';

describe('locale switch href preservation', () => {
  it('preserves search and hash', () => {
    expect(buildLocaleSwitchHrefParts('/', '?ref=1', '#work')).toBe('/?ref=1#work');
    expect(buildLocaleSwitchHref('/project/sample-project', '#facts')).toBe(
      '/project/sample-project#facts',
    );
  });

  it('normalizes pathname without leading slash', () => {
    expect(buildLocaleSwitchHref('about', '#contact')).toBe('/about#contact');
  });
});

describe('year formatting', () => {
  it('keeps Latin numerals in Arabic locale for technical readability', () => {
    expect(formatYear(2025, 'ar')).toBe('2025');
    expect(formatYear(2025, 'en')).toBe('2025');
  });
});
