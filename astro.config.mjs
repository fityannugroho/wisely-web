import react from "@astrojs/react";
import starlight from '@astrojs/starlight';
import tailwind from "@astrojs/tailwind";
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Wisely',
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
    }),
    react(),
    tailwind(),
  ],
});
