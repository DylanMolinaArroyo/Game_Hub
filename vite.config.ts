import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Game_Hub/',
  build: {
    // Inline assets smaller than 10KB as base64 to save HTTP round-trips
    assetsInlineLimit: 10240,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('firebase')) return 'firebase'
          if (id.includes('@chakra-ui') || id.includes('@emotion') || id.includes('framer-motion')) return 'ui'
          if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n'
        },
      },
    },
  },
})
