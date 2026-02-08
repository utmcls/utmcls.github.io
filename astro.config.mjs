import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';

// Vercel sets VERCEL=1. Local dev uses Node adapter for SSR.
const isVercel = process.env.VERCEL === '1';
// Site URL for sitemaps, RSS, etc. Set PUBLIC_SITE_URL in Vercel (or use custom domain).
// Fallback for local dev so Keystatic and other integrations get a valid base URL.
const siteUrl = process.env.PUBLIC_SITE_URL ?? (isVercel ? undefined : 'http://localhost:4321');

// https://astro.build/config
export default defineConfig({
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
    markdoc(),
    keystatic(),
  ],
  output: 'server',
  adapter: isVercel ? vercel() : node({ mode: 'standalone' }),
  site: siteUrl,
  base: '/',
  server: !isVercel
    ? { host: true, port: 4321 }
    : undefined,
});
