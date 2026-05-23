'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel, SectionTitle, Italic } from './SectionPrimitives';

const ROW_1 = [
  { name: 'Magento', category: 'Commerce', accent: '#c8ff3d' },
  { name: 'Hyvä', category: 'Frontend', accent: '#5fe1ff' },
  { name: 'Next.js', category: 'Framework', accent: '#c8ff3d' },
  { name: 'Go', category: 'Backend', accent: '#5fe1ff' },
  { name: 'React', category: 'UI Layer', accent: '#c8ff3d' },
  { name: 'GraphQL', category: 'API', accent: '#5fe1ff' },
  { name: 'Tailwind CSS', category: 'Styling', accent: '#c8ff3d' },
  { name: 'Sanity', category: 'CMS', accent: '#5fe1ff' },
  { name: 'TypeScript', category: 'Language', accent: '#c8ff3d' },
  { name: 'Adobe Commerce', category: 'Platform', accent: '#5fe1ff' },
];

const ROW_2 = [
  { name: 'Docker', category: 'DevOps', accent: '#5fe1ff' },
  { name: 'Redis', category: 'Cache', accent: '#c8ff3d' },
  { name: 'Elasticsearch', category: 'Search', accent: '#5fe1ff' },
  { name: 'MySQL', category: 'Database', accent: '#c8ff3d' },
  { name: 'RabbitMQ', category: 'Queue', accent: '#5fe1ff' },
  { name: 'PHP', category: 'Language', accent: '#c8ff3d' },
  { name: 'Node.js', category: 'Runtime', accent: '#5fe1ff' },
  { name: 'Kubernetes', category: 'Orchestration', accent: '#c8ff3d' },
  { name: 'PWA', category: 'Mobile', accent: '#5fe1ff' },
  { name: 'Varnish', category: 'Cache', accent: '#c8ff3d' },
];

const STATS = [
  { value: `${ROW_1.length + ROW_2.length}`, label: 'Technologies' },
  { value: '4', label: 'Domains' },
  { value: '4+', label: 'Years in production' },
  { value: '100%', label: 'Open standards' },
];

function TechPill({ name, category, accent }: { name: string; category: string; accent: string }) {
  return (
    <div className="flex-shrink-0 group flex items-center gap-4 px-6 py-4 border border-line bg-bg-2 mx-2 hover:border-line-strong hover:bg-bg transition-all duration-300 cursor-default">
      <span
        className="w-[6px] h-[6px] flex-shrink-0 transition-all duration-300 group-hover:scale-150"
        style={{ background: accent, boxShadow: `0 0 8px ${accent}55` }}
      />
      <span className="font-display font-normal text-[16px] md:text-[17px] text-ink whitespace-nowrap leading-none">
        {name}
      </span>
      <span
        className="font-mono text-[9px] tracking-[0.14em] uppercase whitespace-nowrap border-l border-line pl-4 transition-colors duration-300"
        style={{ color: accent + 'aa' }}
      >
        {category}
      </span>
    </div>
  );
}

function MarqueeRow({ items, reverse = false, speed }: { items: typeof ROW_1; reverse?: boolean; speed: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full py-px">
      <div
        className={`flex w-max ${reverse ? 'animate-marquee-right' : 'animate-marquee-left'} hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <TechPill key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.techstack-header > *', {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
      gsap.from('.techstack-stat', {
        opacity: 0,
        y: 16,
        stagger: 0.08,
        duration: 0.6,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.techstack-stats', start: 'top 88%', once: true },
      });
      gsap.from('.techstack-tracks', {
        opacity: 0,
        duration: 0.8,
        ease: 'none',
        scrollTrigger: { trigger: '.techstack-tracks', start: 'top 90%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="techstack"
      className="border-t border-line relative overflow-hidden bg-bg-2 py-24 md:py-36"
    >
      {/* Subtle radial accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(200,255,61,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <div className="techstack-header px-6 md:px-10 mb-16">
        <SectionLabel num="06">Engineering Stack</SectionLabel>
        <SectionTitle className="!mb-4">
          Built on <Italic>proven</Italic>, battle-tested tools.
        </SectionTitle>
        <p className="text-[14px] md:text-[15px] text-ink-dim leading-[1.7] max-w-xl font-light">
          Every technology in our stack is hand-picked for production resilience, developer
          ergonomics, and long-term maintainability. No hype, no bloat.
        </p>
      </div>

      {/* Stats */}
      <div className="techstack-stats px-6 md:px-10 mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line">
          {STATS.map((s) => (
            <div key={s.label} className="techstack-stat bg-bg-2 px-6 py-5 flex flex-col gap-1">
              <span
                className="font-mono text-[22px] font-light tracking-[-0.02em]"
                style={{ color: '#c8ff3d' }}
              >
                {s.value}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee tracks */}
      <div className="techstack-tracks relative space-y-3">
        <MarqueeRow items={ROW_1} speed={34} />
        <MarqueeRow items={ROW_2} reverse speed={40} />
      </div>

      {/* Edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10"
        style={{ background: 'linear-gradient(to right, var(--bg-2), transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10"
        style={{ background: 'linear-gradient(to left, var(--bg-2), transparent)' }}
      />
    </section>
  );
}
