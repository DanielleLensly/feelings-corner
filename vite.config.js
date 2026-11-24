import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'rewrite-create-route',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/create' || req.url === '/create/') {
            req.url = '/create.html';
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/create' || req.url === '/create/') {
            req.url = '/create.html';
          }
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        create: resolve(__dirname, 'create.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
