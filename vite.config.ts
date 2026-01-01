import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],

    base: '/', // ✅ Vercel / 自定义域名必须是 /

    server: {
        port: 5173,
        open: true
    },

    build: {
        outDir: 'dist',
        sourcemap: false
    }
})
