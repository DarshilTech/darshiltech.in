import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { getAllPosts } from '@/lib/sanity-queries';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const posts = await getAllPosts().catch(() => []);

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/insights/${post.slug.current}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/#about`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/#expertise`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/#philosophy`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/#process`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/insights`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/#contact`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postEntries,
  ];
}
