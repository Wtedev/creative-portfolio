import { createClient } from 'next-sanity';

import {
  getSanityApiVersion,
  getSanityDataset,
  getSanityProjectId,
  getSanityReadToken,
  isSanityConfigured,
} from '@/lib/env';

function baseConfig() {
  return {
    projectId: getSanityProjectId()!,
    dataset: getSanityDataset(),
    apiVersion: getSanityApiVersion(),
    token: getSanityReadToken(),
  };
}

export function getSanityClient() {
  if (!isSanityConfigured()) {
    throw new Error('Sanity is not configured');
  }

  return createClient({
    ...baseConfig(),
    useCdn: true,
    perspective: 'published',
  });
}

export function getSanityPreviewClient() {
  if (!isSanityConfigured()) {
    throw new Error('Sanity is not configured');
  }

  return createClient({
    ...baseConfig(),
    useCdn: false,
    perspective: 'previewDrafts',
  });
}
