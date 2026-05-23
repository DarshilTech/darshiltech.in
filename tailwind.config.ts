import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#07090c',
        'bg-2': '#0b0e13',
        ink: '#e8ecef',
        'ink-dim': '#8a93a0',
        'ink-faint': '#3a424d',
        line: 'rgba(255,255,255,0.06)',
        'line-strong': 'rgba(255,255,255,0.12)',
        accent: '#c8ff3d',
        'accent-dim': '#5b7a1c',
        cyan: '#5fe1ff',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-inter-tight)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
