import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy API requests to the FastAPI backend during local development
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        // Optional: rewrite path if your backend doesn't expect the /api prefix
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    // Optional: Sets up '@' as an alias for the 'src' directory 
    // to make deep imports cleaner in the future.
    alias: {
      '@': '/src',
    },
  },
})
