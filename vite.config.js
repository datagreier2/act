import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        omOss: fileURLToPath(new URL('./om-oss/index.html', import.meta.url)),
        kontakt: fileURLToPath(new URL('./kontakt/index.html', import.meta.url)),
      },
    },
  },
  optimizeDeps: {
    entries: ['index.html', 'om-oss/index.html', 'kontakt/index.html'],
  },
})
