/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({}),
    AutoImport({
      imports: [
        'vue',
        'vitest',
        {
          'vue-types': [['default', 'VueTypes']],
        }],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['vue2', '@vue/composition-api', 'vue-demi'],
    },
  },
})
