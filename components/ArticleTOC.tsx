'use client';

import { useEffect, useState } from 'react';

export type TocHeading = { id: string; text: string; level: 2 | 3 };

export default function ArticleTOC({ headings }: { headings: TocHeading[] }) {
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    if (!headings.length) return;

    const READING_LINE = 0.28; // 28% from top of viewport = "currently reading"

    const update = () => {
      const threshold = window.innerHeight * READING_LINE;
      let idx = -1;
      headings.forEach((h, i) => {
        const el = document.getElementById(h.id);
        if (!el) return;
        if (el.getBoundingClientRect().top <= threshold) idx = i;
      });
      setActiveIdx(idx);
    };

    window.addEventListener('scroll', update, { passive: true });
    update(); // run once on mount
    return () => window.removeEventListener('scroll', update);
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint mb-5">
        Contents
      </p>

      {/* Overall reading progress bar */}
      <div className="relative mb-5">
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-line" />
        <div
          className="absolute left-0 top-0 w-[2px] bg-accent transition-all duration-300 ease-out"
          style={{
            height:
              activeIdx < 0
                ? '0%'
                : activeIdx >= headings.length - 1
                ? '100%'
                : `${((activeIdx + 1) / headings.length) * 100}%`,
          }}
        />

        <ul className="space-y-0 pl-4">
          {headings.map((h, i) => {
            const isActive = i === activeIdx;
            const isRead = i < activeIdx;

            return (
              <li key={h.id} style={{ paddingLeft: h.level === 3 ? '10px' : '0' }}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(h.id)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                  className={`
                    group flex items-start gap-2 font-mono text-[10px] leading-[1.5] py-[4px] pr-2
                    transition-all duration-200
                    ${isActive
                      ? 'text-accent'
                      : isRead
                      ? 'text-ink-dim'
                      : 'text-ink-faint hover:text-ink-dim'}
                  `}
                >
                  {/* Read check dot */}
                  <span
                    className={`
                      flex-shrink-0 mt-[0.35em] w-[4px] h-[4px] transition-all duration-200
                      ${isActive ? 'bg-accent scale-125' : isRead ? 'bg-accent/50' : 'bg-transparent border border-line-strong'}
                    `}
                  />
                  <span className={isRead ? 'opacity-60' : ''}>
                    {h.text}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Progress label */}
      {activeIdx >= 0 && (
        <p className="font-mono text-[9px] text-ink-faint tracking-[0.1em] uppercase pl-4">
          {activeIdx + 1} / {headings.length} sections
        </p>
      )}
    </nav>
  );
}
