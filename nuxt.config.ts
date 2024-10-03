// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: [""],
  },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    plugins: [],
  },
  imports: {
    autoImport: true,
  },
});
