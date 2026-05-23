'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel, SectionTitle, Italic } from './SectionPrimitives';
import type { SanityPost, SanityCategory } from '@/lib/sanity-types';

function formatDate(iso: string) {
  return new Date(iso)
    .toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    .toUpperCase();
}

const Arrow = () => (
  <span className="inline-block w-5 h-2.5 transition-transform group-hover:translate-x-1.5">
    <svg viewBox="0 0 20 10">
      <path d="M 0 5 L 18 5 M 13 0 L 18 5 L 13 10" stroke="#c8ff3d" fill="none" strokeWidth="1.2" />
    </svg>
  </span>
);

const BackArrow = () => (
  <span className="inline-block w-5 h-2.5 transition-transform group-hover:-translate-x-1.5 rotate-180">
    <svg viewBox="0 0 20 10">
      <path d="M 0 5 L 18 5 M 13 0 L 18 5 L 13 10" stroke="#c8ff3d" fill="none" strokeWidth="1.2" />
    </svg>
  </span>
);

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
        <path
          d="M 20 160 L 80 120 L 140 140 L 200 80 L 260 100 L 320 40 L 380 60"
          stroke="#c8ff3d"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 20 170 L 80 145 L 140 155 L 200 130 L 260 135 L 320 110 L 380 115"
          stroke="rgba(95,225,255,0.5)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="3 3"
        />
        <circle cx="320" cy="40" r="4" fill="#c8ff3d" />
        <text x="334" y="44" fill="#c8ff3d" fontFamily="JetBrains Mono" fontSize="9">
          PEAK
        </text>
      </svg>
    </div>
  );
}

function FeaturedCard({ post }: { post: SanityPost }) {
  const meta = [post.readTime, post.publishedAt ? formatDate(post.publishedAt) : '']
    .filter(Boolean)
    .join(' · ');

  return (
    <Link
      href={`/insights/${post.slug.current}`}
      className="insight-card group bg-bg-2 p-8 min-h-[460px] lg:min-h-[680px] lg:row-span-2 flex flex-col justify-between cursor-pointer transition-colors hover:bg-bg border-r border-line"
    >
      <div>
        <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-accent tracking-[0.1em] uppercase mb-4">
          <span className="w-[5px] h-[5px] bg-accent" />
          {post.category?.title ?? 'Article'} · Featured
        </div>

        <h2 className="font-display font-normal text-3xl md:text-4xl leading-[1.2] tracking-[-0.01em] my-4">
          {post.title}
        </h2>

        {post.imageUrl ? (
          <div className="relative h-[220px] my-6 border border-line overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        ) : (
          <PlaceholderGraphic />
        )}

        <p className="text-[13px] text-ink-dim leading-[1.6] mb-6">{post.excerpt}</p>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-1 border border-line text-ink-faint"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-line font-mono text-[10px] text-ink-faint tracking-[0.1em] uppercase">
        <span>{meta}</span>
        <Arrow />
      </div>
    </Link>
  );
}

function InsightCard({ post }: { post: SanityPost }) {
  const meta = [post.readTime, post.publishedAt ? formatDate(post.publishedAt) : '']
    .filter(Boolean)
    .join(' · ');

  return (
    <Link
      href={`/insights/${post.slug.current}`}
      className="insight-card group bg-bg-2 p-8 min-h-[280px] flex flex-col justify-between cursor-pointer transition-colors hover:bg-bg"
    >
      <div>
        {/* {post.imageUrl && (
          <div className="relative h-[130px] mb-5 border border-line overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )} */}

        <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-accent tracking-[0.1em] uppercase">
          <span className="w-[5px] h-[5px] bg-accent" />
          {post.category?.title ?? 'Article'}
        </div>

        <h3 className="font-display font-normal text-2xl leading-[1.2] tracking-[-0.01em] my-4">
          {post.title}
        </h3>
        <p className="text-[13px] text-ink-dim leading-[1.6]">{post.excerpt}</p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-line font-mono text-[10px] text-ink-faint tracking-[0.1em] uppercase mt-6">
        <span>{meta}</span>
        <Arrow />
      </div>
    </Link>
  );
}

interface Props {
  posts: SanityPost[];
  categories: SanityCategory[];
}

export default function InsightsPageClient({ posts, categories }: Props) {
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('All');
  const [isAnimating, setIsAnimating] = useState(false);

  const filterLabels = ['All', ...categories.map((c) => c.title)];

  const filtered =
    active === 'All' ? posts : posts.filter((p) => p.category?.title === active);
  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);

  // Single unified GSAP effect — scoped to `ref` so class selectors
  // only match within this component, and ctx.revert() kills everything
  // cleanly on unmount (fixes "hidden on client nav, works on reload").
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero words
      const words = heroRef.current?.querySelectorAll<HTMLElement>('.hero-word') ?? [];
      if (words.length) {
        gsap.from(words, { opacity: 0, y: 24, stagger: 0.07, duration: 0.8, ease: 'expo.out', delay: 0.1 });
      }

      // Hero supporting elements — scoped class selectors work inside gsap.context
      gsap.from('.hero-meta',    { opacity: 0, y: 10, duration: 0.6, delay: 0.5,  ease: 'expo.out' });
      gsap.from('.hero-filters', { opacity: 0, y: 10, duration: 0.6, delay: 0.65, ease: 'expo.out' });
      gsap.from('.hero-count',   { opacity: 0,        duration: 0.5, delay: 0.8,  ease: 'none' });

      // Cards — ScrollTrigger is also cleaned up by ctx.revert()
      gsap.utils.toArray<HTMLElement>('.insight-card').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          delay: i * 0.07,
          ease: 'expo.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
        });
      });

      ScrollTrigger.refresh();
    }, ref); // <-- scope: all selectors resolved within ref.current

    return () => ctx.revert(); // kills tweens + ScrollTriggers on unmount
  }, []);

  // Filter switch with GSAP fade
  const handleFilter = useCallback(
    (f: string) => {
      if (f === active || isAnimating) return;
      setIsAnimating(true);
      const cards = gridRef.current?.querySelectorAll<HTMLElement>('.insight-card');
      gsap.to(cards ?? [], {
        opacity: 0,
        y: 16,
        duration: 0.22,
        stagger: 0.03,
        ease: 'power2.in',
        onComplete: () => {
          setActive(f);
          setIsAnimating(false);
          requestAnimationFrame(() => {
            const next = gridRef.current?.querySelectorAll<HTMLElement>('.insight-card');
            gsap.fromTo(
              next ?? [],
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'expo.out' }
            );
          });
        },
      });
    },
    [active, isAnimating]
  );

  return (
    <section
      ref={ref}
      className="min-h-screen border-t border-line relative z-[5] bg-bg-2"
    >
      {/* Hero header */}
      <div ref={heroRef} className="px-6 md:px-10 pt-24 md:pt-36 pb-12">
        <Link
          href="/#insights"
          className="group inline-flex items-center gap-2 font-mono text-[10px] text-ink-faint tracking-[0.12em] uppercase mb-16 hover:text-accent transition-colors"
        >
          <BackArrow />
          Back to Home
        </Link>

        <div className="hero-meta">
          <SectionLabel num="05">Software Journal</SectionLabel>
        </div>
        <SectionTitle className="!mb-4">
          {'Notes from the'.split(' ').map((w, i) => (
            <span key={i} className="hero-word inline-block mr-[0.25em]">
              {w}
            </span>
          ))}{' '}
          <Italic>
            <span className="hero-word inline-block">field.</span>
          </Italic>
        </SectionTitle>
        <p className="hero-meta text-[13px] text-ink-dim leading-[1.7] max-w-xl">
          In-depth writing on commerce architecture, Magento internals, Hyvä patterns, Golang services, and practical AI integration.
        </p>
      </div>

      {/* ── Sticky filter bar ─────────────────────────────── */}
      <div className="hero-filters sticky top-[72px] z-40 border-y border-line bg-bg-2/90 backdrop-blur-md px-6 md:px-10 py-3">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex gap-2 flex-wrap">
            {filterLabels.map((f) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className={`border px-3.5 py-1.5 font-mono text-[10px] tracking-[0.1em] uppercase cursor-pointer transition-all ${
                  active === f
                    ? 'bg-accent text-bg border-accent'
                    : 'bg-transparent border-line-strong text-ink-dim hover:bg-accent hover:text-bg hover:border-accent'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="hero-count font-mono text-[10px] text-ink-faint tracking-[0.1em] uppercase">
            {filtered.length} {filtered.length === 1 ? 'Article' : 'Articles'}
          </span>
        </div>
      </div>

      <div className="px-6 md:px-10 py-10">

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="border border-line p-16 text-center">
          <p className="font-mono text-[11px] text-ink-faint tracking-[0.12em] uppercase">
            No articles in this category yet.
          </p>
        </div>
      )}

      {/* Grid */}
      {featured && (
        <div
          ref={gridRef}
          className={`grid gap-px bg-line border border-line ${
            rest.length > 0 ? 'lg:grid-cols-[1.4fr_1fr_1fr]' : 'grid-cols-1'
          }`}
        >
          <FeaturedCard post={featured} />
          {rest.length > 0 && (
            <div className="grid grid-cols-1 lg:col-span-2 gap-px bg-line">
              {rest.map((post) => (
                <InsightCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom rule */}
      <div className="mt-16 border-t border-line pt-8 flex justify-between items-center">
        <span className="font-mono text-[10px] text-ink-faint tracking-[0.12em] uppercase">
          darshiltech · software journal
        </span>
        <span className="font-mono text-[10px] text-ink-faint tracking-[0.12em] uppercase">
          {new Date().getFullYear()}
        </span>
      </div>
      </div>{/* /px wrapper */}
    </section>
  );
}
