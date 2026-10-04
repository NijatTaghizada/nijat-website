import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from https://nijattaghizada.github.io/nijat-website/ on GitHub Pages
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/nijat-website/' : '/',
  plugins: [react()],
}))
