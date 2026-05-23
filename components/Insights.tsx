'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel, SectionTitle, Italic } from './SectionPrimitives';
import type { SanityPost } from '@/lib/sanity-types';

const Arrow = () => (
  <span className="inline-block w-5 h-2.5 transition-transform group-hover:translate-x-1.5">
    <svg viewBox="0 0 20 10">
      <path d="M 0 5 L 18 5 M 13 0 L 18 5 L 13 10" stroke="#c8ff3d" fill="none" strokeWidth="1.2" />
    </svg>
  </span>
);

function formatDate(iso: string) {
  return new Date(iso)
    .toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    .toUpperCase();
}

function PlaceholderGraphic() {
  return (
    <div
      className="h-[200px] my-6 relative border border-line overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, transparent 50%, rgba(200,255,61,0.05) 50%), linear-gradient(45deg, transparent 50%, rgba(95,225,255,0.04) 50%)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full">
        <path d="M 20 160 L 80 120 L 140 140 L 200 80 L 260 100 L 320 40 L 380 60" stroke="#c8ff3d" strokeWidth="1.5" fill="none" />
        <path d="M 20 170 L 80 145 L 140 155 L 200 130 L 260 135 L 320 110 L 380 115" stroke="rgba(95,225,255,0.5)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
        <circle cx="320" cy="40" r="4" fill="#c8ff3d" />
        <text x="334" y="44" fill="#c8ff3d" fontFamily="JetBrains Mono" fontSize="9">PEAK</text>
      </svg>
    </div>
  );
}

export default function Insights({ posts }: { posts: SanityPost[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.insight-card').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 30, duration: 0.7, delay: i * 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.insights-grid', start: 'top 85%', once: true },
        });
      });
      ScrollTrigger.refresh();
    }, ref);
    return () => ctx.revert();
  }, []);

  const featured = posts[0] ?? null;
  const rest = posts.slice(1);

  return (
    <section
      ref={ref}
      id="insights"
      className="border-t border-line px-6 md:px-10 py-24 md:py-36 relative z-[5] bg-bg-2"
    >
      <div className="flex justify-between items-end mb-10 flex-wrap gap-6">
        <div>
          <SectionLabel num="05">Software Journal</SectionLabel>
          <SectionTitle className="!mb-0">
            Notes from the <Italic>field</Italic>.
          </SectionTitle>
        </div>

        <Link
          href="/insights"
          className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] uppercase border border-line-strong px-4 py-2.5 text-ink-dim hover:bg-accent hover:text-bg hover:border-accent transition-all"
        >
          All Insights
          <Arrow />
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="border border-line p-16 text-center">
          <p className="font-mono text-[11px] text-ink-faint tracking-[0.12em] uppercase">
            No articles published yet.{' '}
            <Link href="/insights" className="text-accent hover:underline">
              Check back soon
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="insights-grid grid lg:grid-cols-[1.4fr_1fr_1fr] gap-px bg-line border border-line">
          {/* Featured */}
          {featured && (
            <Link
              href={`/insights/${featured.slug.current}`}
              className="insight-card group bg-bg-2 p-8 min-h-[460px] lg:min-h-[720px] lg:row-span-2 flex flex-col justify-between cursor-pointer transition-colors hover:bg-bg"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-accent tracking-[0.1em] uppercase">
                  <span className="w-[5px] h-[5px] bg-accent" />
                  {featured.category?.title ?? 'Article'} · Long-form
                </div>
                <h3 className="font-display font-normal text-3xl md:text-4xl leading-[1.2] tracking-[-0.01em] my-4">
                  {featured.title}
                </h3>

                {featured.imageUrl ? (
                  <div className="relative h-[200px] my-6 border border-line overflow-hidden">
                    <Image
                      src={featured.imageUrl}
                      alt={featured.title}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                ) : (
                  <PlaceholderGraphic />
                )}

                <p className="text-[13px] text-ink-dim leading-[1.6] mb-6">{featured.excerpt}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-line font-mono text-[10px] text-ink-faint tracking-[0.1em] uppercase">
                <span>
                  {[featured.readTime, featured.publishedAt ? formatDate(featured.publishedAt) : '']
                    .filter(Boolean)
                    .join(' · ')}
                </span>
                <Arrow />
              </div>
            </Link>
          )}

          {/* Rest */}
          {rest.map((post) => (
            <Link
              key={post._id}
              href={`/insights/${post.slug.current}`}
              className="insight-card group bg-bg-2 p-8 min-h-[360px] flex flex-col justify-between cursor-pointer transition-colors hover:bg-bg"
            >
              <div>
                {post.imageUrl && (
                  <div className="relative h-[120px] mb-4 border border-line overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-accent tracking-[0.1em] uppercase">
                  <span className="w-[5px] h-[5px] bg-accent" />
                  {post.category?.title ?? 'Article'}
                </div>
                <h3 className="font-display font-normal text-2xl leading-[1.2] tracking-[-0.01em] my-4">
                  {post.title}
                </h3>
                <p className="text-[13px] text-ink-dim leading-[1.6] mb-6">{post.excerpt}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-line font-mono text-[10px] text-ink-faint tracking-[0.1em] uppercase">
                <span>
                  {[post.readTime, post.publishedAt ? formatDate(post.publishedAt) : '']
                    .filter(Boolean)
                    .join(' · ')}
                </span>
                <Arrow />
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-end">
        <Link
          href="/insights"
          className="group inline-flex items-center gap-3 border border-line-strong px-5 py-3 font-mono text-[10px] tracking-[0.1em] uppercase text-ink-dim hover:bg-accent hover:text-bg hover:border-accent transition-all"
        >
          View All Insights
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
