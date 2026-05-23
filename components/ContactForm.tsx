'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import HCaptcha from '@hcaptcha/react-hcaptcha';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [hCaptchaToken, setHCaptchaToken] = useState<string>('');
  const [hCaptchaKey, setHCaptchaKey] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnWrapRef = useRef<HTMLDivElement>(null);
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim() || '';
  const hCaptchaSiteKey =
    process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY?.trim() || '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

  // Magnetic button effect
  useEffect(() => {
    const wrap = btnWrapRef.current;
    const btn = btnRef.current;
    if (!wrap || !btn) return;

    const handleMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4 });
    };
    const handleLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    wrap.addEventListener('mousemove', handleMove);
    wrap.addEventListener('mouseleave', handleLeave);
    return () => {
      wrap.removeEventListener('mousemove', handleMove);
      wrap.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!accessKey) {
      setState('error');
      setErrorMsg('Missing Web3Forms access key. Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local.');
      return;
    }

    if (!hCaptchaToken) {
      setState('error');
      setErrorMsg('Please complete the hCaptcha challenge before sending.');
      return;
    }

    setState('submitting');
    setErrorMsg('');

    // Honeypot — bots fill this, humans don't
    if (formData.get('botcheck')) {
      setState('success');
      return;
    }

    // Web3Forms required fields
    formData.set('access_key', accessKey);
    formData.set('subject', `New Brief from ${formData.get('name')} — DarshilTech`);
    formData.set('from_name', 'DarshilTech Website');
    formData.set('h-captcha-response', hCaptchaToken);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setState('success');
        form.reset();
        setHCaptchaToken('');
        setHCaptchaKey((currentKey) => currentKey + 1);
      } else {
        setState('error');
        setErrorMsg(data.message || 'Submission failed. Please try again.');
        setHCaptchaToken('');
        setHCaptchaKey((currentKey) => currentKey + 1);
      }
    } catch (err) {
      setState('error');
      setErrorMsg('Network error. Please check your connection and retry.');
      setHCaptchaToken('');
      setHCaptchaKey((currentKey) => currentKey + 1);
    }
  }

  if (state === 'success') {
    return (
      <div className="mx-auto max-w-[760px] border border-line-strong bg-[rgba(11,14,19,0.4)] backdrop-blur-xl p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 border border-accent mb-6 rotate-45">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 -rotate-45"
            fill="none"
            stroke="#c8ff3d"
            strokeWidth="1.5"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-3xl mb-3">Brief received.</h3>
        <p className="text-ink-dim text-sm leading-relaxed max-w-md mx-auto">
          Your message has been transmitted to{' '}
          <span className="text-accent font-mono text-xs">info@darshiltech.in</span>.
          We respond within one business day.
        </p>
        <button
          onClick={() => setState('idle')}
          className="mt-8 font-mono text-[10px] tracking-[0.15em] uppercase text-ink-dim hover:text-accent transition-colors"
        >
          ← Send another brief
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-[760px] border border-line-strong bg-[rgba(11,14,19,0.4)] backdrop-blur-xl p-8 md:p-12"
    >
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="subject" value="New Brief from Website Visitor — DarshilTech" />
      <input type="hidden" name="from_name" value="DarshilTech Website" />

      {/* Honeypot — hidden from real users */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Field label="// Name" name="name" type="text" placeholder="Your full name" required />
        <Field label="// Email" name="email" type="email" placeholder="you@company.com" required />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Field label="// Company" name="company" type="text" placeholder="Organization" />
        <div>
          <label className="block font-mono text-[10px] text-ink-faint tracking-[0.15em] uppercase mb-2">
            // Engagement Type
          </label>
          <select
            name="engagement"
            defaultValue="Architecture review"
            className="field-input w-full bg-transparent border-b border-line-strong py-3 text-ink-dim font-body text-[15px]"
          >
            <option className="bg-bg">Architecture review</option>
            <option className="bg-bg">Magento / Hyvä build</option>
            <option className="bg-bg">Performance engagement</option>
            <option className="bg-bg">Headless migration</option>
            <option className="bg-bg">AI automation</option>
            <option className="bg-bg">Technical consulting</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-mono text-[10px] text-ink-faint tracking-[0.15em] uppercase mb-2">
          // Brief
        </label>
        <textarea
          name="message"
          required
          placeholder="Tell us about the system you're building or the problem you're solving."
          className="field-input w-full bg-transparent border-b border-line-strong py-3 text-ink font-body text-[15px] min-h-[100px] resize-y"
        />
      </div>

      <div className="mt-2 flex flex-col items-center gap-3">
        <HCaptcha
          key={hCaptchaKey}
          sitekey={hCaptchaSiteKey}
          reCaptchaCompat={false}
          onVerify={(token: string) => setHCaptchaToken(token)}
          onExpire={() => setHCaptchaToken('')}
        />
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-faint text-center">
          Verify to protect this form from spam.
        </p>
      </div>

      {state === 'error' && (
        <div className="mt-6 border border-[#ff7a59] bg-[rgba(255,122,89,0.05)] p-4 font-mono text-xs text-[#ff7a59]">
          // ERROR — {errorMsg}
        </div>
      )}

      <div ref={btnWrapRef} className="block mx-auto mt-8 w-fit relative">
        <button
          ref={btnRef}
          type="submit"
          disabled={state === 'submitting'}
          className="bg-accent text-bg border-none px-12 py-5 font-mono text-xs tracking-[0.15em] uppercase cursor-pointer flex items-center gap-3 transition-[gap,background] hover:gap-5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state === 'submitting' ? (
            <>
              Transmitting<span className="inline-block animate-pulse">...</span>
            </>
          ) : (
            <>
              Transmit Brief
              <svg width="20" height="10" viewBox="0 0 20 10">
                <path
                  d="M 0 5 L 18 5 M 13 0 L 18 5 L 13 10"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.2"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] text-ink-faint tracking-[0.15em] uppercase mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="field-input w-full bg-transparent border-b border-line-strong py-3 text-ink font-body text-[15px]"
      />
    </div>
  );
}
