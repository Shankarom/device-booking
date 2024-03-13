import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import alias from 'vite-plugin-alias';

export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: [
        { find: '@', replacement: resolve(__dirname, 'src') }
      ]
    })
  ]
});
