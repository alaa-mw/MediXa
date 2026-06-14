import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { baseUrl } from './src/shared/api/http-instance';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      '/api': {
        target:  baseUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
