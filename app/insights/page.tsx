import type { Metadata } from 'next';
import Script from 'next/script';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import InsightsPageClient from '@/components/InsightsPageClient';
import { getAllPosts, getAllCategories } from '@/lib/sanity-queries';
import { siteConfig } from '@/lib/site-config';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Software Journal',
  description:
    'In-depth notes on Magento, Hyvä, Golang, headless commerce architecture, performance, and AI integration from the engineers building scalable commerce systems.',
  alternates: {
    canonical: `${siteConfig.url}/insights`,
  },
  openGraph: {
    title: 'Software Journal — DarshilTech',
    description:
      'In-depth notes on Magento, Hyvä, Golang, headless commerce architecture, performance, and AI integration.',
    url: `${siteConfig.url}/insights`,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Software Journal — DarshilTech',
      },
    ],
  },
};

export default async function InsightsPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts().catch(() => []),
    getAllCategories().catch(() => []),
  ]);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Software Journal — DarshilTech',
    description: 'Technical insights on commerce engineering.',
    url: `${siteConfig.url}/insights`,
    numberOfItems: posts.length,
    itemListElement: posts.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteConfig.url}/insights/${post.slug.current}`,
      name: post.title,
    })),
  };

  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <InsightsPageClient posts={posts} categories={categories} />
      </main>
      <Footer />
      <Script
        id="ld-insights-list"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}
