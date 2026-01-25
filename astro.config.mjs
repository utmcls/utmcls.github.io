import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';

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
  trailingSlash: "never",
  integrations: [

    {
      name: 'init-postcss',
      hooks: {
        'astro:config:setup': ({ config }) => {

          if (!config.style) {
            config.style = {};
          }
          if (!config.style.postcss) {
            config.style.postcss = {};
          }
          // Only initialize plugins array if it doesn't exist
          if (!Array.isArray(config.style.postcss.plugins)) {
            config.style.postcss.plugins = [];
          }
        },
      },
    },

    tailwind({
      applyBaseStyles: true,
    }),

    react(),
    // Enable Keystatic on Vercel and local dev, disable for GitHub Pages builds
    ...(enableKeystatic ? [keystatic()] : []),
  ],
  // Use server mode when Keystatic is enabled or on Vercel, static for GitHub Pages only
  output: useServerOutput ? 'server' : 'static',
  // Use Vercel adapter on Vercel, Node adapter for local SSR dev, no adapter for static builds
  adapter: isVercel ? vercel() : (useServerOutput ? node({ mode: 'standalone' }) : undefined),
  
  site: isVercel ? 'https://utmcls.github.io' : 'http://localhost:4321',
  base: '/',
  // Server config for local development (not relevant for Vercel)
  // accept connections from both localhost and 127.0.0.1
  server: !isVercel ? {
    host: true,
    port: 4321,
  } : undefined,
});
