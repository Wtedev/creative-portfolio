import type { LocalizedString, LocalizedText } from '@/types/global';

import {
  validateBioLength,
  validateEmail,
  validateHexColor,
  validateOrder,
  validateRequiredLocalizedString,
  validateRequiredLocalizedText,
  validateSlug,
  validateUrl,
  validateYear,
} from '@/lib/content/validation';

type LocalizedValue = { en?: string; ar?: string } | undefined;

export const requiredLocalizedString = (fieldLabel: string) => (value: LocalizedValue) =>
  validateRequiredLocalizedString(value as LocalizedString, fieldLabel);

export const requiredLocalizedText =
  (fieldLabel: string, maxLength = 500) =>
  (value: LocalizedValue) =>
    validateRequiredLocalizedText(value as LocalizedText, fieldLabel, maxLength);

export const requiredSlug = (value: { current?: string } | undefined) =>
  validateSlug(value?.current);

export const requiredEmail = (value: string | undefined) => validateEmail(value, true);

export const optionalEmail = (value: string | undefined) => validateEmail(value, false);

export const optionalUrl = (value: string | undefined) => validateUrl(value, false);

export const requiredUrl = (value: string | undefined) => validateUrl(value, true);

export const optionalHexColor = (value: string | undefined) => validateHexColor(value, false);

export const requiredYear = (value: number | undefined) => validateYear(value);

export const requiredOrder = (value: number | undefined) => validateOrder(value);

export const requiredBio = (value: LocalizedValue) => validateBioLength(value as LocalizedText);
