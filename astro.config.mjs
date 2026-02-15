import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';

// Vercel sets VERCEL=1. Local dev uses Node adapter for SSR.
const isVercel = process.env.VERCEL === '1';
// Site URL for sitemaps, RSS, etc. Set PUBLIC_SITE_URL in Vercel (or use custom domain).
// Fallback for local dev so Keystatic and other integrations get a valid base URL.
const siteUrl = process.env.PUBLIC_SITE_URL ?? (isVercel ? undefined : 'http://localhost:4321');

function keystaticLite() {
  return {
    name: 'keystatic-lite',
    hooks: {
      'astro:config:setup': ({ injectRoute, updateConfig, config }) => {
        updateConfig({
          server: config.server?.host ? {} : { host: '127.0.0.1' },
          vite: {
            resolve: {
              dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
            },
            plugins: [{
              name: 'keystatic-config-resolver',
              resolveId(id) {
                if (id === 'virtual:keystatic-config') {
                  return this.resolve('./keystatic.config', './a');
                }
                return null;
              },
            }],
            optimizeDeps: {
              include: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                '@keystatic/astro/ui',
                '@keystatic/astro/api',
                '@keystatic/core/ui',
                '@keystatic/core',
                'lodash/debounce.js',
              ],
            },
          },
        });

        injectRoute({
          entrypoint: '@keystatic/astro/internal/keystatic-astro-page.astro',
          pattern: '/keystatic/[...params]',
          prerender: false,
        });
        injectRoute({
          entrypoint: '@keystatic/astro/internal/keystatic-api.js',
          pattern: '/api/keystatic/[...params]',
          prerender: false,
        });
      },
    },
  };
}

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
    keystaticLite(),
  ],
  vite: {
    build: {
      cssCodeSplit: false,
    },
  },
  output: 'server',
  adapter: isVercel ? vercel() : node({ mode: 'standalone' }),
  site: siteUrl,
  base: '/',
  server: !isVercel
    ? { host: true, port: 4321 }
    : undefined,
});
