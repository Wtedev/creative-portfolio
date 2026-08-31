import createImageUrlBuilder from '@sanity/image-url';

import { getSanityDataset, getSanityProjectId } from '@/lib/env';

type SanityImageValue =
  | Parameters<ReturnType<typeof createImageUrlBuilder>['image']>[0]
  | {
      asset?: {
        _ref?: string;
        url?: string;
      };
    }
  | null
  | undefined;

export function urlForImage(source: SanityImageValue) {
  const projectId = getSanityProjectId();
  const dataset = getSanityDataset();

  if (!projectId || !source) {
    return null;
  }

  return createImageUrlBuilder({ projectId, dataset }).image(source);
}

export function getImageUrl(
  source: SanityImageValue,
  options?: { width?: number; height?: number; quality?: number },
): string | undefined {
  if (!source) return undefined;

  const assetUrl =
    typeof source === 'object' && source !== null && 'asset' in source
      ? source.asset?.url
      : undefined;

  if (assetUrl) return assetUrl;

  let builder = urlForImage(source);
  if (!builder) return undefined;

  if (options?.width) builder = builder.width(options.width);
  if (options?.height) builder = builder.height(options.height);
  if (options?.quality) builder = builder.quality(options.quality);

  return builder.auto('format').url();
}

export function getFileUrl(
  file:
    | {
        asset?: {
          url?: string;
        };
      }
    | null
    | undefined,
): string | undefined {
  return file?.asset?.url;
}
