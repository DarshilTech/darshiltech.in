'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel, SectionTitle, Italic } from './SectionPrimitives';

const filters = ['All', 'Architecture', 'Magento', 'Hyvä', 'Performance', 'AI'];

const insights = [
  {
    cat: 'Architecture · Long-form',
    title: 'Designing commerce systems that survive a 10× traffic event.',
    excerpt: 'A complete teardown of the architectural decisions that separate a system that flexes under load from one that fails. Queues, idempotency, fan-out, and the subtle math of cache invalidation.',
    meta: '12 MIN READ · 2026.04',
    featured: true,
  },
  { cat: 'Hyvä', title: 'Hyvä, but for the parts nobody talks about.', excerpt: 'Notes on theming patterns, asset budgets, and the discipline required to keep Hyvä actually fast in production.', meta: '7 MIN · 2026.03' },
  { cat: 'AI', title: 'Putting an LLM behind your support queue without breaking trust.', excerpt: 'A practical pattern for routing, escalation, and the human-in-the-loop checkpoints that actually matter.', meta: '6 MIN · 2026.02' },
  { cat: 'Magento', title: 'The Magento 2 indexing trap (and how to escape it).', excerpt: "Why scheduled vs update-on-save isn't a checkbox decision — and what to measure before you flip it.", meta: '9 MIN · 2026.01' },
  { cat: 'Performance', title: 'A Lighthouse score is a starting point, not a finish line.', excerpt: 'What real-user metrics, field data, and conversion impact tell you that Lighthouse never will.', meta: '5 MIN · 2025.12' },
];

const Arrow = () => (
  <span className="inline-block w-5 h-2.5 transition-transform group-hover:translate-x-1.5">
    <svg viewBox="0 0 20 10">
      <path d="M 0 5 L 18 5 M 13 0 L 18 5 L 13 10" stroke="#c8ff3d" fill="none" strokeWidth="1.2" />
    </svg>
  </span>
);

export default function Insights() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState('All');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.insight-card').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 30, duration: 0.7, delay: i * 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.insights-grid', start: 'top 85%' },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="insights"
      className="border-t border-line px-6 md:px-10 py-24 md:py-36 relative z-[5] bg-bg-2"
    >
      <div className="flex justify-between items-end mb-15 flex-wrap gap-6">
        <div>
          <SectionLabel num="05">Software Journal</SectionLabel>
          <SectionTitle className="!mb-0">
            Notes from the <Italic>field</Italic>.
          </SectionTitle>
        </div>

        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`border px-3.5 py-2 font-mono text-[10px] tracking-[0.1em] uppercase cursor-pointer transition-all ${
                active === f
                  ? 'bg-accent text-bg border-accent'
                  : 'bg-transparent border-line-strong text-ink-dim hover:bg-accent hover:text-bg hover:border-accent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="insights-grid grid lg:grid-cols-[1.4fr_1fr_1fr] gap-px bg-line border border-line">
        {insights.map((post, i) => {
          if (post.featured) {
            return (
              <article
                key={i}
                className="insight-card group bg-bg-2 p-8 min-h-[460px] lg:min-h-[720px] lg:row-span-2 flex flex-col justify-between cursor-pointer transition-colors hover:bg-bg"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-accent tracking-[0.1em] uppercase">
                    <span className="w-[5px] h-[5px] bg-accent" />
                    {post.cat}
                  </div>
                  <h3 className="font-display font-normal text-3xl md:text-4xl leading-[1.2] tracking-[-0.01em] my-4">
                    {post.title}
                  </h3>
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
                  <p className="text-[13px] text-ink-dim leading-[1.6] mb-6">{post.excerpt}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-line font-mono text-[10px] text-ink-faint tracking-[0.1em] uppercase">
                  <span>{post.meta}</span>
                  <Arrow />
                </div>
              </article>
            );
          }
          return (
            <article
              key={i}
              className="insight-card group bg-bg-2 p-8 min-h-[360px] flex flex-col justify-between cursor-pointer transition-colors hover:bg-bg"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-accent tracking-[0.1em] uppercase">
                  <span className="w-[5px] h-[5px] bg-accent" />
                  {post.cat}
                </div>
                <h3 className="font-display font-normal text-2xl leading-[1.2] tracking-[-0.01em] my-4">
                  {post.title}
                </h3>
                <p className="text-[13px] text-ink-dim leading-[1.6] mb-6">{post.excerpt}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-line font-mono text-[10px] text-ink-faint tracking-[0.1em] uppercase">
                <span>{post.meta}</span>
                <Arrow />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
