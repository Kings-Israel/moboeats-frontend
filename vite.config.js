import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
      {find: '@axios', replacement: () => resolve(__dirname, 'src/api/axios')},
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  server: {
    host: 'admin.moboeats.test',
    port: 3000
  }
})
