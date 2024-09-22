import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      assets: '/src/assets',
      styles: '/src/styles',
      hooks: '/src/hooks',
      constants: '/src/constants',
      api: '/src/api',
      utils: '/src/utils',
      helpers: '/src/helpers',
      controllers: '/src/api/controllers',
    }
  }
})
