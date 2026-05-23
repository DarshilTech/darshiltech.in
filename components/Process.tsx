'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel, SectionTitle, Italic } from './SectionPrimitives';

const stages = [
  { num: '// 01', name: 'Discovery', dur: '1–2 weeks' },
  { num: '// 02', name: 'Architecture', dur: '2–3 weeks' },
  { num: '// 03', name: 'Documentation', dur: 'Continuous' },
  { num: '// 04', name: 'Implementation', dur: '6–14 weeks' },
  { num: '// 05', name: 'Optimization', dur: '2–4 weeks' },
  { num: '// 06', name: 'Scale & Ops', dur: 'Ongoing' },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(path, { strokeDashoffset: 0, duration: 3, ease: 'power2.inOut' });
        gsap.to('.stage-circle', {
          opacity: 1, scale: 1, duration: 0.5, stagger: 0.35, delay: 0.4, ease: 'back.out(2)',
        });
        gsap.to('.stage-label', { opacity: 1, duration: 0.5, stagger: 0.35, delay: 0.5 });
      },
    });
  }, []);

  return (
    <section
      ref={ref}
      id="process"
      className="border-t border-line px-6 md:px-10 py-24 md:py-36 relative z-[5]"
    >
      <SectionLabel num="04">Engagement Process</SectionLabel>
      <SectionTitle>
        Six stages.
        <br />
        Predictable <Italic>delivery</Italic>.
      </SectionTitle>

      <div
        className="mt-10 relative border border-line p-10 md:p-15"
        style={{ background: 'linear-gradient(180deg, rgba(11,14,19,0.6), transparent)' }}
      >
        <svg viewBox="0 0 1200 320" fill="none" preserveAspectRatio="xMidYMid meet" className="w-full h-[260px] md:h-[320px]">
          <line x1="0" y1="160" x2="1200" y2="160" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />
          <path
            ref={pathRef}
            d="M 60 240 Q 200 240 240 160 Q 280 80 400 80 Q 520 80 560 160 Q 600 240 720 240 Q 840 240 880 160 Q 920 80 1040 80 L 1140 80"
            stroke="#c8ff3d"
            strokeWidth="1.5"
            fill="none"
          />

          {[
            { x: 60, y: 240 }, { x: 240, y: 160 }, { x: 400, y: 80 },
            { x: 560, y: 160 }, { x: 720, y: 240 }, { x: 880, y: 160 }, { x: 1040, y: 80 },
          ].map((p, i) => (
            <g key={i} className="stage-circle" style={{ opacity: 0, transformOrigin: 'center', transform: 'scale(0)' }}>
              <circle cx={p.x} cy={p.y} r="8" stroke="#c8ff3d" strokeWidth="1.2" fill="#07090c" />
              <circle cx={p.x} cy={p.y} r="3" fill="#c8ff3d" />
            </g>
          ))}

          {[
            { x: 60, y: 280, label: 'discovery', num: '01', below: true },
            { x: 240, y: 140, label: 'architecture', num: '02', below: false },
            { x: 400, y: 60, label: 'documentation', num: '03', below: false },
            { x: 560, y: 140, label: 'implementation', num: '04', below: false },
            { x: 720, y: 280, label: 'optimization', num: '05', below: true },
            { x: 880, y: 140, label: 'scale', num: '06', below: false },
          ].map((s, i) => (
            <g key={i} className="stage-label" style={{ opacity: 0 }}>
              <text x={s.x} y={s.y} textAnchor="middle" fill="#e8ecef" fontFamily="Fraunces" fontSize="14" fontStyle="italic">{s.label}</text>
              <text x={s.x} y={s.below ? s.y + 16 : s.y - 15} textAnchor="middle" fill="#8a93a0" fontFamily="JetBrains Mono" fontSize="9">{s.num}</text>
            </g>
          ))}
          <g className="stage-label" style={{ opacity: 0 }}>
            <text x="1040" y="60" textAnchor="middle" fill="#c8ff3d" fontFamily="Fraunces" fontSize="14" fontStyle="italic">ship.</text>
          </g>
        </svg>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-line mt-10 pt-8">
          {stages.map((s, i) => (
            <div
              key={i}
              className={`pr-4 ${i < stages.length - 1 ? 'border-r border-line' : ''} ${i < 3 ? 'pb-4 lg:pb-0 border-b lg:border-b-0 border-line' : ''}`}
            >
              <div className="font-mono text-[10px] text-ink-faint tracking-[0.15em] mb-2">{s.num}</div>
              <div className="font-display text-lg font-normal mb-1">{s.name}</div>
              <div className="font-mono text-[10px] text-accent tracking-[0.1em]">{s.dur}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
