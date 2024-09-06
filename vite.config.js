import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import path from 'path';

export default defineConfig({
  plugins: [remix()],
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'app'), // Set '~' to alias to the 'app' folder
    },
  },
});
