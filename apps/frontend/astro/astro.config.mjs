import { defineConfig } from "astro/config";
import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import lit from '@astrojs/lit';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
  outDir: '../../../dist/apps/frontend/astro',
  integrations: [solid(),tailwind({
      configFile: fileURLToPath(
        new URL('./tailwind.config.cjs', import.meta.url)
      ),
    }),lit()],
});
