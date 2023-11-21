import react from "@astrojs/react";
import starlight from '@astrojs/starlight';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from 'astro/config';

// https://vercel.com/docs/projects/environment-variables/system-environment-variables#system-environment-variables
const VERCEL_PREVIEW_SITE = process.env.VERCEL_ENV !== 'production'
  && process.env.VERCEL_URL
  && `https://${process.env.VERCEL_URL}`;

const site = VERCEL_PREVIEW_SITE || 'https://wisely.vercel.app/';

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    starlight({
      title: 'Wisely',
      description: 'Obfuscating text or phrases with random uncommon characters',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        id: {
          label: 'Bahasa Indonesia',
          lang: 'id',
        },
      },
      social: {
        github: 'https://github.com/fityannugroho/wisely-web',
      },
      sidebar: [
        {
          label: 'Guides',
          autogenerate: {directory: 'guides'},
          translations: {
            id: 'Panduan',
          },
        },
        {
          label: 'Manual',
          autogenerate: {directory: 'manual'},
        }
      ],
      editLink: {
        baseUrl: 'https://github.com/fityannugroho/wisely-web/edit/main/',
      },
      lastUpdated: true,
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'keywords',
            content: 'wisely, npm, package, github, tools, obfuscator, obfuscate, text, phrase, random, uncommon, character, web, playground',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: site + 'og.jpg',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'twitter:card',
            content: 'summary_large_image',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'twitter:image',
            content: site + 'og.jpg',
          },
        },
      ],
    }),
    react(),
    tailwind({
			applyBaseStyles: false,
    }),
  ],
  output: 'hybrid',
  adapter: vercel(),
});
