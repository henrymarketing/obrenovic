// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import YAML from 'yaml';

const client = YAML.parse(fs.readFileSync('./src/config/client.yaml', 'utf8'));

export default defineConfig({
  site: client.contact.website,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: client.i18n.default,
        locales: Object.fromEntries(client.i18n.available.map((l) => [l, l])),
      },
    }),
  ],
  vite: {
    plugins: [yaml(), tailwindcss()],
  },
});
