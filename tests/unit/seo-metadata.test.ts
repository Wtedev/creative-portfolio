import { describe, expect, it } from 'vitest';

import { serializeJsonLd } from '@/lib/seo/metadata';

describe('serializeJsonLd', () => {
  it('escapes angle brackets in serialized JSON-LD', () => {
    const serialized = serializeJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      description: '<script>alert(1)</script>',
    });

    expect(serialized).not.toContain('<script>');
    expect(serialized).toContain('\\u003c');
  });
});
