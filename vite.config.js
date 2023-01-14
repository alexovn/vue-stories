import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {

  if (command === 'serve') {
    return {
      plugins: [vue()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `
              @import "@/assets/styles/mixins.scss";
              @import "@/assets/styles/vars.scss";
            `
          }
        }
      }
    }
  } else {
    return {
      plugins: [vue()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
      base: '/vue-stories/',
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `
              @import "@/assets/styles/mixins.scss";
              @import "@/assets/styles/vars.scss";
            `
          }
        }
      }
    }
  }

})
