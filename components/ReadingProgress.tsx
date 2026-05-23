'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? Math.min((scrolled / total) * 100, 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-accent origin-left"
        style={{ width: `${pct}%`, transition: 'width 0.05s linear' }}
      />
    </div>
  );
}
