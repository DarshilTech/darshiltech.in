'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel, SectionTitle, Italic } from './SectionPrimitives';

const phases = [
  { step: 'PHASE.01 INTENT', title: 'Write the system before you build it.', desc: "Every project begins with a spec. Decisions live in markdown, not in someone's head. The document is the foundation." },
  { step: 'PHASE.02 SHAPE', title: 'Architecture precedes implementation.', desc: 'Service boundaries, data contracts, and scaling vectors get drawn before features. Clarity now saves weeks later.' },
  { step: 'PHASE.03 BUILD', title: 'Ship small, ship documented.', desc: 'Every merge updates the system map. The repo and the docs evolve as one. No undocumented surprises live in production.' },
  { step: 'PHASE.04 LAST', title: 'Maintainability is the long game.', desc: 'Code outlives teams. We engineer for the engineer who inherits this in three years. They should thank us for it.' },
];

const principles = [
  { num: '/P.01', title: 'Boring tech, where possible.', desc: 'Mature tools outperform fashionable ones. We choose stability when stability serves you.' },
  { num: '/P.02', title: "Measure, don't guess.", desc: 'Profilers, logs, and load tests before opinions. Performance work is data, not intuition.' },
  { num: '/P.03', title: 'Composability over cleverness.', desc: 'Systems made of small, replaceable parts age better than one monolithic act of brilliance.' },
  { num: '/P.04', title: 'Engineer to be replaced.', desc: "If only one person can run it, it's a liability. We document so handoff is uneventful." },
];

export default function Philosophy() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.workflow-node').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 30, duration: 0.7, delay: i * 0.12,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.workflow-system', start: 'top 80%' },
        });
      });
      gsap.utils.toArray<HTMLElement>('.principle').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 20, duration: 0.6, delay: i * 0.1,
          scrollTrigger: { trigger: '.principles', start: 'top 85%' },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="philosophy"
      className="border-t border-line px-6 md:px-10 py-24 md:py-36 relative z-[5] bg-bg-2"
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(200,255,61,0.06), transparent 50%), radial-gradient(circle at 70% 70%, rgba(95,225,255,0.04), transparent 50%)',
        }}
      />
      <div className="relative z-[2]">
        <SectionLabel num="03">Commerce Philosophy</SectionLabel>
        <SectionTitle>
          Documentation is the
          <br />
          <Italic>architecture</Italic> made visible.
        </SectionTitle>

        <div className="workflow-system grid grid-cols-1 lg:grid-cols-4 border border-line mt-10 relative">
          {phases.map((p, i) => (
            <div
              key={i}
              className={`workflow-node p-7 md:p-10 ${
                i < phases.length - 1 ? 'lg:border-r border-b lg:border-b-0' : ''
              } border-line min-h-[220px] relative`}
            >
              {i < phases.length - 1 && (
                <span
                  className="hidden lg:block absolute top-1/2 -right-[7px] w-[13px] h-[13px] rotate-45 -translate-y-1/2 z-[2]"
                  style={{ background: '#0b0e13', border: '1px solid #c8ff3d' }}
                />
              )}
              <div className="font-mono text-[10px] text-accent tracking-[0.15em] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" style={{ boxShadow: '0 0 8px #c8ff3d' }} />
                {p.step}
              </div>
              <h4 className="font-display font-normal text-[22px] mb-3 tracking-[-0.01em]">{p.title}</h4>
              <p className="text-[13px] text-ink-dim leading-[1.55]">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="principles grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 mt-10 pt-10 border-t border-line">
          {principles.map((p, i) => (
            <div key={i} className="principle">
              <div className="font-mono text-[10px] text-accent tracking-[0.15em] mb-4">{p.num}</div>
              <h4 className="font-display font-normal text-lg mb-2 tracking-[-0.01em]">{p.title}</h4>
              <p className="text-xs text-ink-dim leading-[1.6]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
