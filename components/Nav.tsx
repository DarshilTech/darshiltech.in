'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({
  num,
  href,
  children,
}: {
  num: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-ink-dim hover:text-accent transition-colors relative no-underline"
    >
      <span className="text-ink-faint text-[9px] mr-2">{num}</span>
      {children}
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  // On homepage, anchor links scroll directly; elsewhere they navigate to homepage section.
  const anchor = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] px-5 md:px-10 py-5 flex justify-between items-center font-mono text-[11px] tracking-[0.08em] backdrop-blur-md"
      style={{
        background: 'linear-gradient(to bottom, rgba(7,9,12,0.8), transparent)',
      }}
      aria-label="Primary navigation"
    >
      <Link href="/" className="flex items-center gap-2.5 font-semibold" aria-label="DarshilTech home">
        <span className="relative w-[22px] h-[22px] block">
          <span className="absolute inset-0 border border-accent" />
          <span className="absolute inset-0 border border-ink/40 rotate-45" />
        </span>
        <span className="text-ink">
          Darshil<span className="text-accent">Tech</span>
        </span>
      </Link>

      <div className="hidden md:flex gap-8">
        <NavLink num="01" href={anchor('#about')}>About</NavLink>
        <NavLink num="02" href={anchor('#expertise')}>Expertise</NavLink>
        <NavLink num="03" href={anchor('#philosophy')}>Philosophy</NavLink>
        <NavLink num="04" href={anchor('#process')}>Process</NavLink>
        <NavLink num="05" href="/insights">Insights</NavLink>
      </div>

      <Link
        href={anchor('#contact')}
        className="group border border-line-strong px-3.5 py-2 text-ink no-underline flex items-center gap-2 transition-all hover:bg-accent hover:text-bg hover:border-accent"
      >
        <span
          className="w-1.5 h-1.5 bg-accent rounded-full group-hover:bg-bg group-hover:shadow-none transition-all"
          style={{ boxShadow: '0 0 8px #c8ff3d' }}
        />
        Initiate Build
      </Link>
    </nav>
  );
}
