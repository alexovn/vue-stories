import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base: mode === 'production' ? '/vue-stories/' : '',
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/styles/mixins.scss";
            @import "@/assets/styles/vars.scss";
            @import "@/assets/styles/typography.scss";
          `
        }
      }
    }
  }
});
