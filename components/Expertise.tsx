'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel, SectionTitle, Italic } from './SectionPrimitives';

const expertise = [
  {
    num: '// 001',
    tag: 'Commerce',
    title: 'Magento & Adobe Commerce',
    desc: 'Enterprise-grade implementations, complex catalogs, B2B flows, and multi-store architecture engineered to scale.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.2">
        <rect x="8" y="8" width="32" height="32" />
        <path d="M8 18 L40 18 M18 8 L18 40" />
      </svg>
    ),
  },
  {
    num: '// 002',
    tag: 'Storefront',
    title: 'Hyvä Development',
    desc: 'Lightning-fast Hyvä themes built with Tailwind and Alpine. Sub-second loads, perfect Lighthouse, real conversion lift.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.2">
        <path d="M8 12 L40 12 L40 40 L8 40 Z M8 22 L40 22" />
        <circle cx="14" cy="17" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: '// 003',
    tag: 'Systems',
    title: 'Golang Systems',
    desc: 'High-throughput services, internal tooling, and integration layers written in Go for predictable performance.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.2">
        <path d="M10 24 L24 10 L38 24 L24 38 Z" />
        <path d="M18 24 L30 24" />
      </svg>
    ),
  },
  {
    num: '// 004',
    tag: 'Intelligence',
    title: 'AI Automation',
    desc: 'LLM-driven workflows for ops, content generation, support routing, and software automation built into your stack.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.2">
        <circle cx="24" cy="24" r="6" />
        <circle cx="24" cy="24" r="14" />
        <path d="M24 4 L24 10 M24 38 L24 44 M4 24 L10 24 M38 24 L44 24" />
      </svg>
    ),
  },
  {
    num: '// 005',
    tag: 'Architecture',
    title: 'System Architecture',
    desc: 'Holistic blueprints that map data flow, service boundaries, scaling vectors, and fail-safe patterns before code ships.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.2">
        <rect x="6" y="6" width="14" height="14" />
        <rect x="28" y="6" width="14" height="14" />
        <rect x="6" y="28" width="14" height="14" />
        <rect x="28" y="28" width="14" height="14" />
        <path d="M20 13 L28 13 M13 20 L13 28 M35 20 L35 28 M20 35 L28 35" />
      </svg>
    ),
  },
  {
    num: '// 006',
    tag: 'Integration',
    title: 'API architecture',
    desc: "REST and GraphQL APIs that are documented, versioned, and built to be consumed by teams you'll never meet.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.2">
        <circle cx="14" cy="24" r="6" />
        <circle cx="34" cy="24" r="6" />
        <path d="M20 24 L28 24" />
      </svg>
    ),
  },
  {
    num: '// 007',
    tag: 'Speed',
    title: 'Performance Optimization',
    desc: 'From cache strategy to bundle splitting to database tuning — making slow systems fast and fast systems faster.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.2">
        <path d="M24 6 L14 28 L24 28 L20 42 L34 20 L24 20 Z" />
      </svg>
    ),
  },
  {
    num: '// 008',
    tag: 'Frontier',
    title: 'Headless Commerce',
    desc: 'Decoupled architectures with Next.js, Vue, or your framework of choice — connected to commerce engines that can keep up.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.2">
        <path d="M8 16 L24 8 L40 16 L40 32 L24 40 L8 32 Z" />
        <path d="M8 16 L24 24 L40 16 M24 24 L24 40" />
      </svg>
    ),
  },
  {
    num: '// 009',
    tag: 'Advisory',
    title: 'Technical Consulting',
    desc: 'Architecture reviews, stack audits, and software strategy for teams making decisions that will outlive their roadmap.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" strokeWidth="1.2">
        <circle cx="24" cy="24" r="16" />
        <path d="M16 24 L22 30 L34 18" />
      </svg>
    ),
  },
];

export default function Expertise() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.expertise-card').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          delay: (i % 3) * 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="expertise" className="border-t border-line px-6 md:px-10 py-24 md:py-36 relative z-[5]">
      <SectionLabel num="02">Capabilities / Stack</SectionLabel>
      <SectionTitle>
        Nine disciplines.
        <br />
        One <Italic>architectural</Italic> mind.
      </SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
        {expertise.map((item, i) => (
          <article
            key={i}
            className="expertise-card border-r border-b border-line p-8 md:p-10 min-h-[280px] relative overflow-hidden cursor-pointer group transition-colors hover:bg-[rgba(200,255,61,0.02)]"
          >
            <span className="absolute top-0 left-0 w-0 h-px bg-accent transition-[width] duration-700 group-hover:w-full" />
            <div className="font-mono text-[10px] text-ink-faint tracking-[0.15em] mb-8">{item.num}</div>
            <div className="w-12 h-12 mb-6 [&_svg]:w-full [&_svg]:h-full [&_svg]:stroke-ink group-hover:[&_svg]:stroke-accent [&_svg]:transition-all group-hover:[&_svg]:rotate-45">
              {item.icon}
            </div>
            <h3 className="font-display font-normal text-2xl mb-3 tracking-[-0.01em]">{item.title}</h3>
            <p className="text-sm text-ink-dim leading-[1.6]">{item.desc}</p>
            <span className="absolute top-8 right-8 font-mono text-[9px] text-ink-faint tracking-[0.1em] uppercase group-hover:text-accent transition-colors">
              {item.tag}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
