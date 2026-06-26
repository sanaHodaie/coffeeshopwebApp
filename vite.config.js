import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base را کاملاً حذف کنید یا خالی بگذارید
  base: './',
})