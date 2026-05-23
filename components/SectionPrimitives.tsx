export function SectionLabel({
  num,
  children,
  center,
}: {
  num: string;
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[10px] tracking-[0.15em] text-ink-dim uppercase mb-6 ${
        center ? 'justify-center' : ''
      }`}
    >
      <span className="w-6 h-px bg-accent" />
      <span className="text-accent">{num}</span> {children}
    </div>
  );
}

export function SectionTitle({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display font-light leading-none tracking-[-0.02em] max-w-[900px] mb-20 ${className}`}
      style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
    >
      {children}
    </h2>
  );
}

export function Italic({ children }: { children: React.ReactNode }) {
  return <span className="italic text-accent">{children}</span>;
}
