import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Charger les variables d'environnement pour le mode donné
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/uploads': {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
        }
      }
    }
  };
});
