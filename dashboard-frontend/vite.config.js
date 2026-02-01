import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    proxy: {
      '/auth': {
        target: 'http://localhost:5003',
        changeOrigin: true
      },
      '/department': {
        target: 'http://localhost:5003',
        changeOrigin: true
      },
      '/exam': {
        target: 'http://localhost:5003',
        changeOrigin: true
      },
      '/notice': {
        target: 'http://localhost:5003',
        changeOrigin: true
      },
      '/files': {
        target: 'http://localhost:5003',
        changeOrigin: true
      },
      '/student': {
        target: 'http://localhost:5003',
        changeOrigin: true
      }
    }
  }
})
