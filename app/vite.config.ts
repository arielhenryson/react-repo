import { defineConfig, UserConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
  },
  server: {
    proxy: {
      '/auth0': {
        target: 'https://dev-qd64wbsipbt3podg.us.auth0.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth0/, ''),
        secure: true,
      },
    },
  },
} as UserConfig)
