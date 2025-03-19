import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import { resolve } from 'path';
import manifest from './src/manifest';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  build: {
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content/index.tsx'),
        boolcheckPopup: resolve(__dirname, 'src/boolcheckPopup/index.tsx'),
      },
      output: {
        entryFileNames: 'assets/[name].bundle.js',
      },
    },
    outDir: resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@src': resolve(__dirname, '../src'),
      crypto: 'crypto-browserify',
    },
  },
  plugins: [react(), crx({ manifest })],
  // for development
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
});
