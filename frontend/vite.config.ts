import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 3000,
    host: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
    // Améliorer les logs Vite pour Cursor
    hmr: {
      overlay: true,
    },
  },
  // Personnaliser les logs de build
  logLevel: 'info',
  clearScreen: false, // Garder les logs visibles dans Cursor
});


