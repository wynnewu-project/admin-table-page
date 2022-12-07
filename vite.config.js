import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from "path";

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    outDir: "lib",
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "Vue3ConfigTable",
      fileName: "vue3-config-table"
    },
    rollupOptions: {
      external: ["vue", "element-plus"],
      output: {
        globals: {
          vue: "Vue",
          elementPlus: "ElementPlus"
        }
      }
    }
  }
})
