import type { PluginOption } from "vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["vuetify/styles", "./assets/styles/index.scss"],
  build: {
    transpile: ["vuetify"],
  },
  modules: ["@pinia/nuxt"],
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    plugins: [["./plugins/vuetify.ts"] as unknown as PluginOption[]],
  },
});
