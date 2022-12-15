import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from "path";

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8173,
  },
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
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "AdminTablePage",
      fileName: "admin-table-page"
    },
    rollupOptions: {
      external: ["vue",],
      output: {
        globals: {
          vue: "Vue",
        }
      }
    }
  }
})
