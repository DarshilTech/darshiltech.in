export default function Footer() {
  return (
    <footer className="border-t border-line px-6 md:px-10 py-10 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] text-ink-faint tracking-[0.1em] uppercase relative z-[5]">
      <div>© 2026 DarshilTech · Software as scalable digital commerce systems</div>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-accent rounded-full blink" style={{ boxShadow: '0 0 8px #c8ff3d' }} />
        All systems operational
      </div>
      <div>darshiltech.in · v.2026.05</div>
    </footer>
  );
}
