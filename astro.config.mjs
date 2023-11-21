import react from "@astrojs/react";
import starlight from '@astrojs/starlight';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
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
    }),
    react(),
    tailwind({
			applyBaseStyles: false,
    }),
  ],
  output: 'hybrid',
  adapter: vercel(),
});
