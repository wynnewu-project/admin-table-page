import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    visualizer(),
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
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "Vue3ConfigTable",
      fileName: "vue3-config-table"
    },
    rollupOptions: {
      external: ["vue", /element-plus.*base.*style.*/], 
      output: {
        globals: {
          vue: "Vue",
        }
      }
    }
  }
})
