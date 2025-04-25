import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', // 设置为0.0.0.0以允许通过IP访问
    port: 8888, // 你可以指定一个端口，默认是3000
    strictPort: true // 如果端口已被占用，则抛出错误
  }
})
