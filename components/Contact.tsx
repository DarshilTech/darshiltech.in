import ContactForm from './ContactForm';
import { SectionLabel, Italic } from './SectionPrimitives';

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-line px-6 md:px-10 pt-32 md:pt-40 pb-20 relative z-[5]"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(200,255,61,0.06), transparent 60%), #07090c',
      }}
    >
      <SectionLabel num="07" center>Initiate Build</SectionLabel>
      <h2
        className="font-display font-light leading-[0.95] tracking-[-0.03em] text-center mb-6"
        style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}
      >
        Let's make software <Italic>efficient</Italic>  
        <br />
      and <Italic>scalable.</Italic>
      </h2>
      <p className="text-center text-ink-dim max-w-[540px] mx-auto mb-16 text-[15px] leading-[1.6]">
        For commerce architecture, performance work, headless builds, or technical advisory. Start
        with a brief and we'll respond within one business day.
      </p>

      <ContactForm />

      <div className="grid md:grid-cols-3 gap-6 max-w-[760px] mx-auto mt-16 border-t border-line pt-10">
        <Channel label="// Direct" value={<a href="mailto:info@darshiltech.in" className="hover:text-accent transition-colors">info@darshiltech.in</a>} />
        <Channel label="// Calendar" value={<a href="https://calendly.com/darshil-dgonix/30min" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Book a 30-min architecture call →</a>} />
        <Channel label="// Location" value="Ahmedabad · Remote-first" />
      </div>
    </section>
  );
}

function Channel({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] text-ink-faint tracking-[0.15em] uppercase mb-2">{label}</div>
      <div className="font-display text-[17px] text-ink">{value}</div>
    </div>
  );
}
