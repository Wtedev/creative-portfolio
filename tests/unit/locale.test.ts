import { describe, expect, it } from 'vitest';

import {
  formatDate,
  formatYear,
  getLocalizedList,
  getLocalizedValue,
  getOppositeLocale,
} from '@/lib/utilities/locale';

describe('locale utilities', () => {
  it('returns localized string for active locale with English fallback', () => {
    expect(getLocalizedValue({ en: 'Hello', ar: 'مرحبا' }, 'ar')).toBe('مرحبا');
    expect(getLocalizedValue({ en: 'Hello', ar: '' }, 'ar')).toBe('Hello');
  });

  it('returns localized lists with fallback', () => {
    expect(getLocalizedList({ en: ['One'], ar: ['واحد'] }, 'ar')).toEqual(['واحد']);
    expect(getLocalizedList({ en: ['One'], ar: [] }, 'ar')).toEqual(['One']);
  });

  it('formats year and date for Arabic locale', () => {
    expect(formatYear(2025, 'ar')).toBe('2025');
    expect(formatDate(new Date('2025-01-15'), 'ar')).toContain('2025');
  });

  it('returns opposite locale', () => {
    expect(getOppositeLocale('en')).toBe('ar');
    expect(getOppositeLocale('ar')).toBe('en');
  });
});
