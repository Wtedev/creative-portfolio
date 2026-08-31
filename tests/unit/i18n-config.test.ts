import { describe, expect, it } from 'vitest';

import { isValidLocale, localeDirections } from '@/i18n/config';

describe('locale configuration', () => {
  it('validates supported locales', () => {
    expect(isValidLocale('en')).toBe(true);
    expect(isValidLocale('ar')).toBe(true);
    expect(isValidLocale('fr')).toBe(false);
  });

  it('maps locale directions', () => {
    expect(localeDirections.en).toBe('ltr');
    expect(localeDirections.ar).toBe('rtl');
  });
});
