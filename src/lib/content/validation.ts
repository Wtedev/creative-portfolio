import type { LocalizedString, LocalizedText } from '@/types/global';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_COLOR_PATTERN = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /^https?:\/\/.+/;

export function validateRequiredLocalizedString(
  value: LocalizedString | undefined,
  fieldLabel = 'Field',
): string | true {
  if (!value?.en?.trim()) {
    return `${fieldLabel}: English is required`;
  }
  if (!value?.ar?.trim()) {
    return `${fieldLabel}: Arabic is required`;
  }
  return true;
}

export function validateRequiredLocalizedText(
  value: LocalizedText | undefined,
  fieldLabel = 'Field',
  maxLength = 500,
): string | true {
  const stringResult = validateRequiredLocalizedString(value, fieldLabel);
  if (stringResult !== true) return stringResult;

  if ((value?.en?.length ?? 0) > maxLength) {
    return `${fieldLabel}: English exceeds ${maxLength} characters`;
  }
  if ((value?.ar?.length ?? 0) > maxLength) {
    return `${fieldLabel}: Arabic exceeds ${maxLength} characters`;
  }
  return true;
}

export function validateSlug(value: string | undefined): string | true {
  if (!value?.trim()) return 'Slug is required';
  if (!SLUG_PATTERN.test(value)) {
    return 'Slug must use lowercase letters, numbers, and hyphens only';
  }
  return true;
}

export function validateEmail(value: string | undefined, required = true): string | true {
  if (!value?.trim()) return required ? 'Email is required' : true;
  if (!EMAIL_PATTERN.test(value.trim())) return 'Enter a valid email address';
  return true;
}

export function validateUrl(value: string | undefined, required = false): string | true {
  if (!value?.trim()) return required ? 'URL is required' : true;
  if (!URL_PATTERN.test(value.trim())) return 'URL must start with http:// or https://';
  return true;
}

export function validateHexColor(value: string | undefined, required = false): string | true {
  if (!value?.trim()) return required ? 'Accent color is required' : true;
  if (!HEX_COLOR_PATTERN.test(value.trim())) {
    return 'Use a valid hex color such as #9A6CFF';
  }
  return true;
}

export function validateYear(value: number | undefined): string | true {
  if (value === undefined || Number.isNaN(value)) return 'Year is required';
  if (!Number.isInteger(value) || value < 2000 || value > 2100) {
    return 'Year must be a whole number between 2000 and 2100';
  }
  return true;
}

export function validateOrder(value: number | undefined): string | true {
  if (value === undefined || Number.isNaN(value)) return 'Order is required';
  if (!Number.isInteger(value) || value < 0) {
    return 'Order must be a non-negative whole number';
  }
  return true;
}

export function validateBioLength(value: LocalizedText | undefined): string | true {
  return validateRequiredLocalizedText(value, 'Short bio', 320);
}

export function isPublishedStatus(status: string | undefined): boolean {
  return status === 'published';
}

export function sortProjectsByOrder<
  T extends { order: number; year: number; title: { en: string } },
>(projects: T[]): T[] {
  return [...projects].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    if (a.year !== b.year) return b.year - a.year;
    return a.title.en.localeCompare(b.title.en);
  });
}
