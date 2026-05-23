import { client } from '@/lib/sanity';
import type { SanityPost, SanityPostFull, SanityCategory } from '@/lib/sanity-types';

export async function getAllPosts(): Promise<SanityPost[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, author, publishedAt,
      category->{ title, slug },
      tags, excerpt,
      "imageUrl": mainImage.asset->url,
      readTime
    }`
  );
}

export async function getLatestPosts(limit = 5): Promise<SanityPost[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) [0...$limit] {
      _id, title, slug, author, publishedAt,
      category->{ title, slug },
      tags, excerpt,
      "imageUrl": mainImage.asset->url,
      readTime
    }`,
    { limit }
  );
}

export async function getPostBySlug(slug: string): Promise<SanityPostFull | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, author, publishedAt,
      category->{ title, slug },
      tags, excerpt,
      "imageUrl": mainImage.asset->url,
      body, readTime
    }`,
    { slug }
  );
}

export async function getAllCategories(): Promise<SanityCategory[]> {
  return client.fetch(
    `*[_type == "category"] | order(title asc) { _id, title, slug, description }`
  );
}

export async function getRelatedPosts(
  currentSlug: string,
  categorySlug: string,
  limit = 3
): Promise<SanityPost[]> {
  try {
    return client.fetch(
      `*[_type == "post" && slug.current != $currentSlug && category->slug.current == $categorySlug] | order(publishedAt desc) [0...$limit] {
        _id, title, slug, author, publishedAt,
        category->{ title, slug },
        tags, excerpt,
        "imageUrl": mainImage.asset->url,
        readTime
      }`,
      { currentSlug, categorySlug, limit }
    );
  } catch {
    return [];
  }
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch<string[]>(`*[_type == "post"].slug.current`);
    return slugs || [];
  } catch {
    return [];
  }
}
