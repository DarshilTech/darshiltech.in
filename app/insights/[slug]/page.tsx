import type { Metadata } from 'next';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import ReadingProgress from '@/components/ReadingProgress';
import ArticleTOC, { type TocHeading } from '@/components/ArticleTOC';
import { getPostBySlug, getPostSlugs, getRelatedPosts } from '@/lib/sanity-queries';
import type { SanityPost } from '@/lib/sanity-types';
import { siteConfig } from '@/lib/site-config';

export const revalidate = 3600;

/* ─── Static params ─────────────────────────────────────────── */
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

/* ─── Metadata ──────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${siteConfig.url}/insights/${slug}` },
    openGraph: {
      title: `${post.title} — DarshilTech`,
      description: post.excerpt,
      url: `${siteConfig.url}/insights/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author || siteConfig.author],
      images: post.imageUrl
        ? [{ url: post.imageUrl, width: 1200, height: 630, alt: post.title }]
        : [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: post.title }],
    },
  };
}

/* ─── Utilities ─────────────────────────────────────────────── */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getBlockText(value: any): string {
  return value?.children?.map((c: { text?: string }) => c.text ?? '').join('') ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractHeadings(body: any[]): TocHeading[] {
  if (!Array.isArray(body)) return [];
  return body
    .filter((b) => b._type === 'block' && ['h2', 'h3'].includes(b.style))
    .map((b) => {
      const text = getBlockText(b);
      return { id: slugify(text), text, level: (b.style === 'h2' ? 2 : 3) as 2 | 3 };
    })
    .filter((h) => h.id && h.text);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatDateShort(iso: string) {
  return new Date(iso)
    .toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    .toUpperCase();
}

/* ─── Portable Text ─────────────────────────────────────────── */
function buildPtComponents(headings: TocHeading[]): PortableTextComponents {
  const idMap = new Map(headings.map((h) => [h.text, h.id]));

  return {
    block: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      h2: ({ children, value }: any) => {
        const id = idMap.get(getBlockText(value)) ?? slugify(getBlockText(value));
        return (
          <h2 id={id} className="font-display font-normal text-2xl md:text-[1.7rem] leading-[1.2] tracking-[-0.01em] mt-14 mb-5 text-ink scroll-mt-28">
            {children}
          </h2>
        );
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      h3: ({ children, value }: any) => {
        const id = idMap.get(getBlockText(value)) ?? slugify(getBlockText(value));
        return (
          <h3 id={id} className="font-display font-normal text-xl leading-[1.25] tracking-[-0.01em] mt-10 mb-4 text-ink scroll-mt-28">
            {children}
          </h3>
        );
      },
      h4: ({ children }) => (
        <h4 className="font-body font-semibold text-base mt-8 mb-3 text-ink">{children}</h4>
      ),
      normal: ({ children }) => (
        <p className="text-[15px] md:text-[15.5px] text-ink-dim leading-[1.88] mb-5">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="relative border-l-2 border-accent pl-5 my-10 text-ink-dim italic text-[15px] leading-[1.8]">
          <span className="absolute -left-[3px] top-1 w-[4px] h-[4px] bg-accent" />
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="list-none pl-0 mb-5 space-y-2.5">{children}</ul>,
      number: ({ children }) => <ol className="list-none pl-0 mb-5 space-y-2.5">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="flex gap-3 text-[14.5px] text-ink-dim leading-[1.7]">
          <span className="w-[5px] h-[5px] bg-accent mt-[0.58em] flex-shrink-0" />
          <span>{children}</span>
        </li>
      ),
      number: ({ children }) => (
        <li className="flex gap-3 text-[14.5px] text-ink-dim leading-[1.7]">
          <span className="font-mono text-[10px] text-accent mt-[0.45em] flex-shrink-0">—</span>
          <span>{children}</span>
        </li>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
      em: ({ children }) => <em className="italic text-ink">{children}</em>,
      code: ({ children }) => (
        <code className="font-mono text-[11.5px] bg-bg text-accent px-1.5 py-0.5 border border-line">
          {children}
        </code>
      ),
      link: ({ value, children }) => (
        <a href={value?.href} target="_blank" rel="noopener noreferrer"
          className="text-accent underline underline-offset-[3px] decoration-accent/40 hover:decoration-accent transition-colors">
          {children}
        </a>
      ),
    },
    types: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      image: ({ value }: any) =>
        value?.asset?.url ? (
          <figure className="my-10">
            <div className="relative w-full aspect-video border border-line overflow-hidden">
              <Image src={value.asset.url} alt={value.alt ?? ''} fill className="object-cover"
                sizes="(max-width: 768px) 100vw, 680px" />
            </div>
            {value.caption && (
              <figcaption className="font-mono text-[9px] text-ink-faint tracking-[0.1em] mt-3 text-center uppercase">
                {value.caption}
              </figcaption>
            )}
          </figure>
        ) : null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      code: ({ value }: any) => (
        <div className="my-8 border border-line overflow-hidden">
          {value.language && (
            <div className="px-5 py-2.5 border-b border-line bg-bg flex items-center gap-2">
              <span className="w-[4px] h-[4px] bg-accent" />
              <span className="font-mono text-[9px] text-ink-faint tracking-[0.14em] uppercase">{value.language}</span>
            </div>
          )}
          <pre className="p-5 text-[12px] text-ink-dim leading-[1.8] bg-bg font-mono overflow-x-auto">
            <code>{value.code}</code>
          </pre>
        </div>
      ),
    },
  };
}

/* ─── Sub-components ────────────────────────────────────────── */
const BackArrow = () => (
  <span className="inline-block w-4 h-2 transition-transform group-hover:-translate-x-1">
    <svg viewBox="0 0 16 8"><path d="M 16 4 L 1 4 M 6 0 L 1 4 L 6 8" stroke="currentColor" fill="none" strokeWidth="1.2" /></svg>
  </span>
);

const ForwardArrow = () => (
  <span className="inline-block w-4 h-2 transition-transform group-hover:translate-x-1">
    <svg viewBox="0 0 16 8"><path d="M 0 4 L 15 4 M 10 0 L 15 4 L 10 8" stroke="currentColor" fill="none" strokeWidth="1.2" /></svg>
  </span>
);

function RelatedCard({ post }: { post: SanityPost }) {
  return (
    <Link href={`/insights/${post.slug.current}`}
      className="group flex gap-3 py-4 border-b border-line last:border-0 hover:opacity-75 transition-opacity">
      {/* {post.imageUrl && (
        <div className="relative w-14 h-14 flex-shrink-0 border border-line overflow-hidden">
          <Image src={post.imageUrl} alt={post.title} fill className="object-cover opacity-70 group-hover:opacity-90 transition-opacity" sizes="56px" />
        </div>
      )} */}
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[9px] text-accent tracking-[0.1em] uppercase mb-1">
          {post.category?.title ?? 'Article'}
        </p>
        <p className="font-display text-[13px] leading-[1.3] text-ink line-clamp-2">{post.title}</p>
        {post.publishedAt && (
          <p className="font-mono text-[9px] text-ink-faint tracking-[0.08em] mt-1.5">
            {formatDateShort(post.publishedAt)}
          </p>
        )}
      </div>
    </Link>
  );
}

function ExploreCard({ post }: { post: SanityPost }) {
  const meta = [post.readTime, post.publishedAt ? formatDateShort(post.publishedAt) : '']
    .filter(Boolean).join(' · ');
  return (
    <Link href={`/insights/${post.slug.current}`}
      className="group bg-bg-2 flex flex-col transition-colors hover:bg-bg">
      {/* {post.imageUrl ? (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image src={post.imageUrl} alt={post.title} fill
            className="object-cover opacity-70 group-hover:opacity-85 transition-opacity duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        </div>
      ) : (
        <div className="w-full aspect-video" style={{
          background: 'linear-gradient(135deg, transparent 50%, rgba(200,255,61,0.06) 50%), linear-gradient(45deg, transparent 50%, rgba(95,225,255,0.04) 50%)',
        }} />
      )} */}
      <div className="p-5 flex flex-col flex-1">
        <p className="font-mono text-[9px] text-accent tracking-[0.1em] uppercase mb-3">
          {post.category?.title ?? 'Article'}
        </p>
        <h4 className="font-display font-normal text-[1.05rem] leading-[1.25] tracking-[-0.01em] text-ink mb-3 flex-1">
          {post.title}
        </h4>
        <div className="flex justify-between items-center pt-3 border-t border-line font-mono text-[9px] text-ink-faint tracking-[0.1em] uppercase">
          <span>{meta}</span>
          <ForwardArrow />
        </div>
      </div>
    </Link>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default async function InsightPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.body ?? []);
  const ptComponents = buildPtComponents(headings);
  const relatedPosts = post.category?.slug?.current
    ? await getRelatedPosts(slug, post.category.slug.current, 4)
    : [];
  const exploreCards = relatedPosts.slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author || siteConfig.author, url: siteConfig.url },
    publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    url: `${siteConfig.url}/insights/${slug}`,
    ...(post.imageUrl && { image: post.imageUrl }),
    ...(post.tags?.length && { keywords: post.tags.join(', ') }),
  };

  return (
    <>
      <SmoothScroll />
      <ReadingProgress />
      <Nav />

      <main className="pt-[72px]">

        {/* ── Full-width article header ─────────────────────── */}
        <header className="relative bg-bg border-b border-line overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(200,255,61,0.055) 0%, transparent 70%)',
          }} />

          <div className="max-w-5xl mx-auto px-6 md:px-10 pt-14 pb-14 md:pb-16 relative">
            <Link href="/insights"
              className="group inline-flex items-center gap-2 font-mono text-[10px] text-ink-faint tracking-[0.14em] uppercase mb-10 hover:text-accent transition-colors">
              <BackArrow />
              Software Journal
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              {post.category && (
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-accent tracking-[0.12em] uppercase">
                  <span className="w-[5px] h-[5px] bg-accent" />
                  {post.category.title}
                </span>
              )}
              {post.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 border border-line text-ink-faint">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display font-normal text-ink leading-[1.1] tracking-[-0.025em] mb-6 max-w-4xl"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.5rem)' }}>
              {post.title}
            </h1>

            <p className="text-[15px] md:text-[16px] text-ink-dim leading-[1.7] mb-8 max-w-2xl">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 border-t border-line font-mono text-[10px] tracking-[0.1em] uppercase text-ink-faint">
              {post.author && <span className="text-ink-dim">{post.author}</span>}
              {post.publishedAt && (
                <><span className="opacity-30">·</span><span>{formatDate(post.publishedAt)}</span></>
              )}
              {post.readTime && (
                <><span className="opacity-30">·</span><span>{post.readTime}</span></>
              )}
            </div>
          </div>
        </header>


        {/* ── 3-column body ─────────────────────────────────── */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_260px] gap-0 lg:gap-8 xl:gap-12 py-14 md:py-20 lg:items-start">

            {/* Left: sticky TOC */}
            <aside className="hidden lg:block sticky top-28">
              <ArticleTOC headings={headings} />
            </aside>

            {/* Center: article body */}
            <article className="min-w-0">
              {/* Mobile TOC */}
              {headings.length > 0 && (
                <details className="lg:hidden mb-8 border border-line group">
                  <summary className="flex justify-between items-center px-4 py-3 cursor-pointer font-mono text-[10px] text-ink-faint tracking-[0.14em] uppercase select-none hover:text-accent transition-colors list-none">
                    <span>Contents</span>
                    <span className="text-accent text-[8px] tracking-widest">▼</span>
                  </summary>
                  <div className="px-4 pb-4 pt-1 border-t border-line">
                    <ArticleTOC headings={headings} />
                  </div>
                </details>
              )}

              {post.body?.length ? (
                <PortableText value={post.body} components={ptComponents} />
              ) : (
                <p className="font-mono text-[11px] text-ink-faint tracking-[0.12em] uppercase">
                  Full article coming soon.
                </p>
              )}

              {/* End ornament */}
              <div className="flex items-center gap-4 mt-14">
                <div className="flex-1 border-t border-line" />
                <span className="w-[5px] h-[5px] bg-accent flex-shrink-0" />
                <div className="flex-1 border-t border-line" />
              </div>

              {/* All tags */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-6">
                  {post.tags.map((tag) => (
                    <span key={tag}
                      className="font-mono text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 border border-line text-ink-faint hover:border-accent hover:text-accent transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Mobile: related posts */}
              {relatedPosts.length > 0 && (
                <div className="lg:hidden mt-12 border-t border-line pt-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint mb-1">
                    Related Articles
                  </p>
                  {relatedPosts.map((p) => <RelatedCard key={p._id} post={p} />)}
                </div>
              )}

              {/* Bottom nav */}
              <div className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                <Link href="/insights"
                  className="group inline-flex items-center gap-2 font-mono text-[10px] text-ink-faint tracking-[0.14em] uppercase hover:text-accent transition-colors">
                  <BackArrow />
                  All Articles
                </Link>
                <Link href="/#contact"
                  className="group inline-flex items-center gap-2 font-mono text-[10px] text-accent tracking-[0.14em] uppercase hover:underline">
                  Work With Us
                  <ForwardArrow />
                </Link>
              </div>
            </article>

            {/* Right: sticky sidebar */}
            <aside className="hidden lg:block sticky top-28">
              <div className="space-y-8">

                {/* Author */}
                <div className="border border-line p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint mb-4">
                    Written by
                  </p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 border border-accent flex items-center justify-center flex-shrink-0 relative">
                      <span className="absolute inset-0 border border-ink/20 rotate-45" />
                      <span className="font-mono text-[10px] text-accent font-bold relative z-10">
                        {(post.author || siteConfig.author).charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-body text-[12px] font-semibold text-ink">
                        {post.author || siteConfig.author}
                      </p>
                      <p className="font-mono text-[9px] text-ink-faint tracking-[0.08em]">DarshilTech</p>
                    </div>
                  </div>
                  {post.publishedAt && (
                    <p className="font-mono text-[9px] text-ink-faint tracking-[0.1em] uppercase mt-3 pt-3 border-t border-line">
                      {formatDate(post.publishedAt)}
                      {post.readTime && <span className="ml-3 opacity-60">· {post.readTime}</span>}
                    </p>
                  )}
                </div>

                {/* Related */}
                {relatedPosts.length > 0 && (
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint mb-1">
                      Related Articles
                    </p>
                    {relatedPosts.map((p) => <RelatedCard key={p._id} post={p} />)}
                  </div>
                )}

                {/* CTA */}
                <div className="border border-accent/50 p-5">
                  <p className="font-mono text-[9px] text-accent tracking-[0.14em] uppercase mb-3">Build with us</p>
                  <p className="text-[12px] text-ink-dim leading-[1.6] mb-4">
                    Need a scalable commerce system? Let&apos;s talk.
                  </p>
                  <Link href="/#contact"
                    className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] uppercase text-bg bg-accent px-3 py-2 hover:bg-accent/90 transition-colors">
                    Initiate Build <ForwardArrow />
                  </Link>
                </div>

              </div>
            </aside>

          </div>
        </div>

        {/* ── More to Explore ───────────────────────────────── */}
        {exploreCards.length > 0 && (
          <section className="border-t border-line bg-bg">
            <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-20">
              <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent mb-2">
                    Continue Reading
                  </p>
                  <h2 className="font-display font-normal text-2xl md:text-3xl leading-[1.2] tracking-[-0.01em] text-ink">
                    More to Explore
                  </h2>
                </div>
                <Link href="/insights"
                  className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] uppercase text-ink-faint hover:text-accent transition-colors">
                  All Articles <ForwardArrow />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
                {exploreCards.map((p) => <ExploreCard key={p._id} post={p} />)}
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />

      <Script
        id="ld-article"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
