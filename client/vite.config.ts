// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/uploads': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      // redirige /api/* vers http://localhost:3000
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  },
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
