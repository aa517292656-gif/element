import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@element/core': path.resolve(__dirname, '../core'),
      '@element/components': path.resolve(__dirname, '../components'),
      '@element/utils': path.resolve(__dirname, '../utils'),
      '@element/hooks': path.resolve(__dirname, '../hooks'),
      '@element/theme': path.resolve(__dirname, '../theme')
    }
  }
})
