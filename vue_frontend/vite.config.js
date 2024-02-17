import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createProxyMiddleware } from 'http-proxy-middleware';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/submit-form': {
        target: 'http://localhost:3000', // Замените на адрес вашего сервера
        changeOrigin: true,
      },
    },
  },
});
