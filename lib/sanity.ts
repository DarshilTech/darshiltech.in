import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.DGONIX_SANITY_PROJECT_ID || 'z1gikyrs',
  dataset: process.env.DGONIX_SANITY_DATASET || 'production',
  apiVersion: process.env.DGONIX_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export const BLOG_PLACEHOLDER_IMAGE = '/assets/blog-placeholder.svg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasSanityImageAsset(source: any): boolean {
  if (!source || typeof source !== 'object') return false;
  const asset = source.asset;
  if (!asset || typeof asset !== 'object') return false;
  return Boolean(asset._ref || asset._id || asset.url);
}
