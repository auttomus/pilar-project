import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    host: true, // Listen pada 0.0.0.0 (diperlukan untuk Docker)
    allowedHosts: true, // Otomatis mengizinkan semua host (ngrok, dsb.)
    proxy: {
      // Semua request ke /api/* diteruskan ke backend container
      '/api': {
        target: 'http://backend:8000',
        changeOrigin: true,
      }
    }
  },
})
