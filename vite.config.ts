import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue";

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from "vite-plugin-vuetify";
import { Vuetify3Resolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [Vuetify3Resolver()],
      dirs: ["./src/components"],
      dts: true,
    }),
    vuetify(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
