import { describe, expect, it } from 'vitest';

import {
  isPublishedStatus,
  sortProjectsByOrder,
  validateEmail,
  validateHexColor,
  validateRequiredLocalizedString,
  validateSlug,
  validateUrl,
} from '@/lib/content/validation';

describe('content validation helpers', () => {
  it('validates required bilingual strings with language-specific errors', () => {
    expect(validateRequiredLocalizedString({ en: 'Hello', ar: 'مرحبا' })).toBe(true);
    expect(validateRequiredLocalizedString({ en: '', ar: 'مرحبا' }, 'Title')).toContain('English');
    expect(validateRequiredLocalizedString({ en: 'Hello', ar: '' }, 'Title')).toContain('Arabic');
  });

  it('validates slug, email, url, and hex color formats', () => {
    expect(validateSlug('sample-project')).toBe(true);
    expect(validateSlug('Bad Slug')).toContain('lowercase');
    expect(validateEmail('hello@example.com')).toBe(true);
    expect(validateEmail('invalid')).toContain('valid email');
    expect(validateUrl('https://example.com')).toBe(true);
    expect(validateUrl('ftp://example.com')).toContain('http');
    expect(validateHexColor('#9A6CFF')).toBe(true);
    expect(validateHexColor('purple')).toContain('hex');
  });

  it('filters publication status and sorts projects deterministically', () => {
    expect(isPublishedStatus('published')).toBe(true);
    expect(isPublishedStatus('ready')).toBe(false);

    const sorted = sortProjectsByOrder([
      {
        order: 2,
        year: 2024,
        title: { en: 'Beta', ar: 'ب' },
      },
      {
        order: 1,
        year: 2025,
        title: { en: 'Alpha', ar: 'أ' },
      },
    ]);

    expect(sorted[0]?.title.en).toBe('Alpha');
  });
});
