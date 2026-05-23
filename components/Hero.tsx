'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Particles
    const container = particlesRef.current;
    if (container) {
      const particles: HTMLDivElement[] = [];
      for (let i = 0; i < 24; i++) {
        const p = document.createElement('div');
        p.className = 'absolute w-[2px] h-[2px] rounded-full';
        p.style.background = '#c8ff3d';
        p.style.boxShadow = '0 0 6px #c8ff3d';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.opacity = (Math.random() * 0.4 + 0.2).toString();
        p.style.transform = `scale(${Math.random() * 1.5 + 0.5})`;
        container.appendChild(p);
        particles.push(p);
        gsap.to(p, {
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
          duration: Math.random() * 8 + 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      return () => {
        particles.forEach((p) => p.remove());
      };
    }
  }, []);

  useEffect(() => {
    // Entrance timeline
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('.hero-meta-item', { opacity: 0, y: 20, duration: 0.8, stagger: 0.05 })
      .to('.hero-word > span', { y: 0, duration: 1.2, stagger: 0.08 }, '-=0.6')
      .from('.hero-sub', { opacity: 0, y: 20, duration: 0.8 }, '-=0.8')
      .from('.hero-cta > *', { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 }, '-=0.6')
      .from('.architecture-svg', { opacity: 0, scale: 0.9, duration: 1.2 }, '-=1.2');
  }, []);

  return (
    <header
      ref={heroRef}
      id="hero"
      className="min-h-screen relative px-6 md:px-10 pt-32 md:pt-36 pb-15 flex flex-col justify-between z-[5]"
    >
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Meta strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10 font-mono text-[10px] tracking-[0.1em] text-ink-dim pb-6 border-b border-line uppercase">
        <MetaItem label="// Coordinates" value="19.0760° N, 72.8777° E" />
        <MetaItem label="// Status" value="● Live" highlight />
        <MetaItem label="// Discipline" value="Commerce Architecture" />
        <MetaItem label="// Build" value="v.2026.05" />
      </div>

      {/* Main */}
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-15 items-center flex-1 py-10">
        <div>
          <h1
            className="font-display font-light leading-[0.95] tracking-[-0.03em] mb-8"
            style={{ fontSize: 'clamp(48px, 7vw, 104px)' }}
          >
            <Word>Software</Word> <Word>scalable</Word>
            <br />
            <Word>digital</Word>{' '}
            <Word italic>commerce</Word>
            <br />
            <Word>systems.</Word>
          </h1>

          <p className="hero-sub text-[15px] leading-[1.6] text-ink-dim max-w-[480px] mb-10 font-light">
            DarshilTech is a{' '}
            <strong className="text-ink font-medium">solution software studio</strong> building
            enterprise commerce architecture on Magento, Hyvä, Go, and headless systems. We design
            for performance, document for longevity, and engineer for scale.
          </p>

          <div className="hero-cta flex gap-4 flex-wrap">
            <a
              href="#contact"
              className="font-mono text-[11px] tracking-[0.08em] px-5 py-3.5 no-underline inline-flex items-center gap-2.5 uppercase transition-all bg-accent text-bg relative overflow-hidden group"
            >
              <span className="relative z-[1]">Start a Project →</span>
            </a>
            <a
              href="#expertise"
              className="font-mono text-[11px] tracking-[0.08em] px-5 py-3.5 no-underline inline-flex items-center gap-2.5 uppercase transition-all bg-transparent text-ink border border-line-strong hover:border-accent hover:text-accent"
            >
              Explore Capabilities
            </a>
          </div>
        </div>

        <ArchitectureVisual />
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 items-end pt-6 border-t border-line font-mono text-[10px] text-ink-dim uppercase tracking-[0.1em]">
        <div className="hidden md:block">// System integrity 99.99% · Built for enterprise scale</div>
        <div className="flex flex-col items-center gap-2 text-ink mx-auto">
          <span>Scroll</span>
          <div
            className="w-px h-10 scroll-pulse"
            style={{ background: 'linear-gradient(to bottom, #c8ff3d, transparent)' }}
          />
        </div>
        <div className="text-right hidden md:block">
          Solution expert · Commerce architecture · Performance
        </div>
      </div>
    </header>
  );
}

function MetaItem({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="hero-meta-item">
      <span className="text-ink-faint block mb-1">{label}</span>
      <span className={`font-medium ${highlight ? 'text-ink' : 'text-ink'}`}>
        {highlight ? (
          <>
            <span className="text-accent">●</span>
            {value.replace('●', '')}
          </>
        ) : (
          value
        )}
      </span>
    </div>
  );
}

function Word({ children, italic }: { children: React.ReactNode; italic?: boolean }) {
  return (
    <span className="hero-word inline-block overflow-hidden">
      <span
        className={`inline-block ${italic ? 'italic text-accent font-normal' : ''}`}
        style={{ transform: 'translateY(110%)' }}
      >
        {children}
      </span>
    </span>
  );
}

function ArchitectureVisual() {
  return (
    <div className="relative h-[380px] lg:h-[540px] flex items-center justify-center">
      <svg
        className="architecture-svg w-full h-full"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="250" cy="250" r="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <circle cx="250" cy="250" r="180" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="250" cy="250" r="120" stroke="rgba(200,255,61,0.15)" strokeWidth="1" />

        <g>
          <circle cx="250" cy="250" r="5" fill="#c8ff3d" />
          <circle className="pulse-node" cx="250" cy="250" r="14" stroke="#c8ff3d" strokeWidth="1" opacity="0.4" />
          <circle cx="250" cy="250" r="28" stroke="#c8ff3d" strokeWidth="1" opacity="0.15" />
        </g>
        <text x="250" y="284" textAnchor="middle" fill="#c8ff3d" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="2">CORE</text>

        <line className="path-line" x1="250" y1="250" x2="100" y2="100" stroke="#c8ff3d" strokeWidth="1" opacity="0.5" />
        <line className="path-line" x1="250" y1="250" x2="400" y2="100" stroke="#5fe1ff" strokeWidth="1" opacity="0.4" />
        <line className="path-line" x1="250" y1="250" x2="100" y2="400" stroke="#5fe1ff" strokeWidth="1" opacity="0.4" />
        <line className="path-line" x1="250" y1="250" x2="400" y2="400" stroke="#c8ff3d" strokeWidth="1" opacity="0.5" />
        <line className="path-line" x1="250" y1="250" x2="250" y2="60" stroke="#ffffff" strokeWidth="1" opacity="0.15" />
        <line className="path-line" x1="250" y1="250" x2="60" y2="250" stroke="#ffffff" strokeWidth="1" opacity="0.15" />
        <line className="path-line" x1="250" y1="250" x2="440" y2="250" stroke="#ffffff" strokeWidth="1" opacity="0.15" />
        <line className="path-line" x1="250" y1="250" x2="250" y2="440" stroke="#ffffff" strokeWidth="1" opacity="0.15" />

        <g><circle cx="100" cy="100" r="4" fill="#c8ff3d" /><rect x="91" y="91" width="18" height="18" stroke="#c8ff3d" opacity="0.4" /></g>
        <text x="100" y="80" textAnchor="middle" fill="#8a93a0" fontFamily="JetBrains Mono" fontSize="8">MAGENTO</text>

        <g><circle cx="400" cy="100" r="4" fill="#5fe1ff" /><rect x="391" y="91" width="18" height="18" stroke="#5fe1ff" opacity="0.4" /></g>
        <text x="400" y="80" textAnchor="middle" fill="#8a93a0" fontFamily="JetBrains Mono" fontSize="8">HYVÄ</text>

        <g><circle cx="100" cy="400" r="4" fill="#5fe1ff" /><rect x="91" y="391" width="18" height="18" stroke="#5fe1ff" opacity="0.4" /></g>
        <text x="100" y="430" textAnchor="middle" fill="#8a93a0" fontFamily="JetBrains Mono" fontSize="8">GOLANG</text>

        <g><circle cx="400" cy="400" r="4" fill="#c8ff3d" /><rect x="391" y="391" width="18" height="18" stroke="#c8ff3d" opacity="0.4" /></g>
        <text x="400" y="430" textAnchor="middle" fill="#8a93a0" fontFamily="JetBrains Mono" fontSize="8">AI/ML</text>

        <g><circle cx="250" cy="60" r="3" fill="#e8ecef" opacity="0.6" /></g>
        <text x="250" y="44" textAnchor="middle" fill="#8a93a0" fontFamily="JetBrains Mono" fontSize="8">HEADLESS</text>

        <g><circle cx="60" cy="250" r="3" fill="#e8ecef" opacity="0.6" /></g>
        <text x="60" y="240" textAnchor="middle" fill="#8a93a0" fontFamily="JetBrains Mono" fontSize="8">API</text>

        <g><circle cx="440" cy="250" r="3" fill="#e8ecef" opacity="0.6" /></g>
        <text x="440" y="240" textAnchor="middle" fill="#8a93a0" fontFamily="JetBrains Mono" fontSize="8">PERF</text>

        <g><circle cx="250" cy="440" r="3" fill="#e8ecef" opacity="0.6" /></g>
        <text x="250" y="464" textAnchor="middle" fill="#8a93a0" fontFamily="JetBrains Mono" fontSize="8">SCALE</text>

        <path d="M 10 10 L 10 24 M 10 10 L 24 10" stroke="#c8ff3d" strokeWidth="1" />
        <path d="M 490 10 L 490 24 M 490 10 L 476 10" stroke="#c8ff3d" strokeWidth="1" />
        <path d="M 10 490 L 10 476 M 10 490 L 24 490" stroke="#c8ff3d" strokeWidth="1" />
        <path d="M 490 490 L 490 476 M 490 490 L 476 490" stroke="#c8ff3d" strokeWidth="1" />
      </svg>
    </div>
  );
}
