import { getSanityApiVersion, getSanityDataset, getSanityProjectId } from '@/lib/env';

export const sanityEnv = {
  projectId: getSanityProjectId(),
  dataset: getSanityDataset(),
  apiVersion: getSanityApiVersion(),
};
