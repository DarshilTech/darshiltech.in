'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel, SectionTitle, Italic } from './SectionPrimitives';

const timeline = [
  { year: '— 2018', title: 'First Magento builds', text: 'Started shipping enterprise Magento 2 implementations, learning where conventional builds break under real traffic.' },
  { year: '— 2021', title: 'Hyvä & performance era', text: 'Pivoted toward Hyvä-led storefronts. Documented patterns that turned 6-second loads into sub-second experiences.' },
  { year: '— 2023', title: 'Systems & Go services', text: 'Expanded into Golang-based microservices, headless layers, and infrastructure that scales horizontally without ceremony.' },
  { year: '— 2025', title: 'AI automation layer', text: 'Built internal tooling around LLMs for documentation, testing, and operations — applied to client systems as a force multiplier.' },
  { year: '— Now', title: 'DarshilTech as practice', text: 'A solution software studio operating at the intersection of architecture, performance, and pragmatic delivery.' },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          x: -30,
          duration: 0.8,
          delay: i * 0.05,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className="border-t border-line px-6 md:px-10 py-24 md:py-36 relative z-[5]"
      style={{ background: 'linear-gradient(180deg, #07090c 0%, #0b0e13 100%)' }}
    >
      <SectionLabel num="01">About / Origin</SectionLabel>
      <SectionTitle>
        Software practice
        <br />
        obsessed with <Italic>architecture</Italic>,
        <br />
        clarity, and longevity.
      </SectionTitle>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20">
        <div>
          <p className="font-display font-light text-[22px] leading-[1.5] text-ink-dim mb-6">
            DarshilTech began as a <span className="text-ink italic">single conviction</span>: that
            the best commerce systems aren't built by adding features — they're shaped by
            architecture decided long before the first line of code.
          </p>
          <p className="font-display font-light text-[22px] leading-[1.5] text-ink-dim mb-6">
            We work alongside software teams who care how things scale at 10×, 100×, and beyond.
            We document before we build. We measure before we optimize. We design systems that
            survive their teams.
          </p>
          <div className="flex items-center gap-4 mt-12 pt-8 border-t border-line font-mono text-[11px] text-ink-dim">
            <div className="w-8 h-px bg-accent" />
            <div>DARSHIL.MODI — FOUNDING ENGINEER</div>
          </div>
        </div>

        <div className="relative pl-8">
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12) 10%, rgba(255,255,255,0.12) 90%, transparent)',
            }}
          />
          {timeline.map((item, i) => (
            <div key={i} className="timeline-item relative pb-14">
              <div
                className="absolute -left-[37px] top-2 w-2.5 h-2.5 border border-accent rotate-45"
                style={{ background: '#07090c' }}
              />
              <div className="font-mono text-[11px] text-accent tracking-[0.1em] mb-2">{item.year}</div>
              <h3 className="font-display font-normal text-2xl mb-2 tracking-[-0.01em]">{item.title}</h3>
              <p className="text-sm text-ink-dim leading-[1.6] max-w-[440px]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
