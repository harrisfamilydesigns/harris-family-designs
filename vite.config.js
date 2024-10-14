import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const useHttps = process.env.NEXT_PUBLIC_HTTPS === 'true'

  return {
    server: useHttps ? {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'certs/key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'certs/cert.pem')),
      },
    } : false,
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
  }
})
