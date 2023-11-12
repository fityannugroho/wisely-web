import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwind from "@astrojs/tailwind";

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
      sidebar: [{
        label: 'Guides',
        items: [
          // Each item here is one entry in the navigation menu.
          {
            label: 'Example Guide',
            link: '/guides/example/'
          }
        ],
      }, {
        label: 'Reference',
        autogenerate: {
          directory: 'reference'
        }
      }],
      customCss: [
        './src/styles/tailwind.css',
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
