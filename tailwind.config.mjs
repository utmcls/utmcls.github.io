import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      colors: {
        background: 'var(--color-background)',
        foreground: {
          DEFAULT: 'var(--color-foreground)',
          muted: 'var(--color-foreground-muted)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        border: 'var(--color-border)',
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        card: 'var(--color-card)',
        footer: {
          DEFAULT: 'var(--color-footer-bg)',
          foreground: 'var(--color-footer-foreground)',
          'foreground-muted': 'var(--color-footer-foreground-muted)',
          strip: 'var(--color-footer-strip-bg)',
          'strip-foreground': 'var(--color-footer-strip-foreground)',
        },
        tag: {
          workshop: '#38bdf8',
          lecture: '#22c55e',
          hackathon: '#ec4899',
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
      },
      // Explicit typography theme so prose/prose-slate are configured and use design tokens.
      // @tailwindcss/typography merges this with its defaults and generates .prose, .prose-slate, etc.
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--color-muted-foreground)',
            '--tw-prose-body': 'var(--color-muted-foreground)',
            '--tw-prose-headings': 'var(--color-foreground)',
            '--tw-prose-links': 'var(--color-accent)',
          },
        },
        slate: {
          css: {
            '--tw-prose-body': 'var(--color-muted-foreground)',
            '--tw-prose-headings': 'var(--color-foreground)',
            '--tw-prose-links': 'var(--color-accent)',
          },
        },
      },
    },
  },
  plugins: [typography],
};
