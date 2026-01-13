import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from "@tailwindcss/vite";   // 🔥 이 줄이 빠져 있었음
export default defineConfig({
  plugins: [react(), tailwind(),]  // 🔥 Tailwind를 Vite에 직접 연결
})
