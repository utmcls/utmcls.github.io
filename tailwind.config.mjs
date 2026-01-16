/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Michroma', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        // Design system colors
        // Current values are placeholders
        background: {
          DEFAULT: '#0a0a0a',
          dark: '#000000',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#cccccc',
        },
        // Other colors here
      },
      typography: {
        // Typography scale
        fontSize: {
        },
        letterSpacing: {
          wide: '0.1em',
          wider: '0.05em',
        },
      },
      spacing: {
      },
    },
  },
  plugins: [],
};
