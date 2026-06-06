import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // Semantic, theme-aware tokens (flip in dark mode via CSS vars).
        // bg = page base · surface = alt section · card = elevated · ink = text
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        card: 'rgb(var(--c-card) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        'ink-muted': 'rgb(var(--c-ink-muted) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        // Brand tokens — keep in sync with src/styles/tokens.css
        navy: '#0A1B2E',
        blue: {
          DEFAULT: '#1F6FEB',
          600: '#1A5FCC',
          700: '#1551B0',
        },
        cyan: {
          DEFAULT: '#36C5F0',
          400: '#5BD0F3',
        },
        slate: '#5B6B7F',
        cloud: '#F4F7FB',
        // Hero gradient stops
        'navy-2': '#0F2A4A',
        'navy-3': '#143D6B',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'var(--font-poppins)', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
      },
      fontSize: {
        // Fluid display sizes (mobile -> desktop)
        h1: ['clamp(2.5rem, 6vw, 4.75rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h2: ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        h3: ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(10,27,46,0.04), 0 8px 24px rgba(10,27,46,0.06)',
        lift: '0 8px 30px rgba(10,27,46,0.10)',
        glow: '0 8px 30px rgba(31,111,235,0.35)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(120% 120% at 85% 10%, rgba(54,197,240,0.18) 0%, rgba(31,111,235,0.10) 30%, transparent 60%), linear-gradient(160deg, #0A1B2E 0%, #0F2A4A 50%, #143D6B 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
