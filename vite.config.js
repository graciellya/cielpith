import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const legacyPages = ['works', 'journal'].flatMap(directory =>
  readdirSync(directory, { recursive: true })
    .filter(file => file.endsWith('index.html'))
    .map(file => resolve(directory, file)),
);

export default defineConfig({
  plugins: [
    react(),
    {
      // Preserve the classic video helper used by the existing project pages.
      name: 'legacy-video-helper',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'assets/prism-video.js',
          source: readFileSync('assets/prism-video.js', 'utf8'),
        });
      },
    },
  ],
  server: { host: '127.0.0.1', port: 8080 },
  preview: { host: '127.0.0.1', port: 8080 },
  build: { rolldownOptions: { input: [resolve('index.html'), ...legacyPages] } },
});
