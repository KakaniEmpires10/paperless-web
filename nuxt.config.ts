import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  app: {
    head: {
      title: "Paperless Hospital",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
    },
  },
  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/icon",
    "shadcn-nuxt",
    "motion-v/nuxt",
    "nuxt-auth-utils",
  ],

  runtimeConfig: {
    session: {
      maxAge: 60 * 60 * 24 * 3, // 3 days
      password: "",
    },
  },

  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});
