import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel/serverless';

// Determine build mode:
// - GitHub Pages: SKIP_KEYSTATIC=true → static build, no Keystatic
// - Vercel: VERCEL=1 → server mode with Keystatic Admin UI
// - Local dev: neither set → server mode with Keystatic (for local editing)
const isGitHubPagesBuild = process.env.SKIP_KEYSTATIC === 'true';
const isVercel = process.env.VERCEL === '1';
const enableKeystatic = !isGitHubPagesBuild; // Enable in Vercel and local dev

// Keystatic requires server output to function properly (for Admin UI and API routes)
// Only use static output for GitHub Pages builds where Keystatic is disabled
const useServerOutput = enableKeystatic || isVercel;

// https://astro.build/config
export default defineConfig({
  integrations: [
    {
      name: 'init-postcss',
      hooks: {
        'astro:config:setup': ({ config }) => {
          // Initialize PostCSS if it doesn't exist
          if (!config.style) {
            config.style = {};
          }
          if (!config.style.postcss) {
            config.style.postcss = { plugins: [] };
          }
        },
      },
    },
    tailwind({
      applyBaseStyles: true,
    }),
    // Enable Keystatic on Vercel and local dev, disable for GitHub Pages builds
    ...(enableKeystatic ? [keystatic()] : []),
  ],
  // Use server mode when Keystatic is enabled or on Vercel, static for GitHub Pages only
  output: useServerOutput ? 'server' : 'static',
  // Only use Vercel adapter when actually deploying to Vercel, not for local dev
  adapter: isVercel ? vercel() : undefined,
  site: 'https://utmcls.github.io',
  base: '/',
});
