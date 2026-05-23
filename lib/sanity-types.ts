export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  author: string;
  publishedAt: string;
  category: { title: string; slug: { current: string } } | null;
  tags: string[];
  excerpt: string;
  imageUrl?: string;
  readTime: string;
}

export interface SanityPostFull extends SanityPost {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
}

export interface SanityCategory {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}
