import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  app: {
    head: {
      title: "Paperless Hospital",
      meta: [
        {
          name: "description",
          content:
            "Paperless Hospital membantu rumah sakit di Indonesia menjadi lebih efisien dalam pelayanan dan manajemen serta lebih modern dengan teknologi AI tercanggih untuk mendigitalisasi layanan kesehatan secara menyeluruh.",
        },
        {
          name: "keywords",
          content:
            "digitalisasi rumah sakit, AI untuk rumah sakit, sistem informasi rumah sakit, HMS Indonesia, paperless hospital, teknologi kesehatan, transformasi digital rumah sakit",
        },
        {
          property: "og:title",
          content: "Paperless Hospital",
        },
        {
          property: "og:description",
          content:
            "Paperless Hospital membantu rumah sakit di Indonesia menjadi lebih efisien dalam pelayanan dan manajemen serta lebih modern dengan teknologi AI tercanggih untuk mendigitalisasi layanan kesehatan secara menyeluruh.",
        },
      ],
    },
  },

  nitro: {
    storage: {
      uploads: {
        driver: "fs",
        base: process.env.STORAGE_PATH || "./public/uploads",
      },
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
    "@pinia/nuxt",
    "@nuxtjs/seo",
  ],

  runtimeConfig: {
    session: {
      maxAge: 60 * 60 * 24 * 3, // 3 days
      password: "",
    },
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
  },

  ogImage: {
    enabled: false,
  },

  seo: {
    // seo utils
    enabled: false,
  },
  schemaOrg: {
    enabled: false,
  },

  sitemap: {
    exclude: ["/dashboard/**", "/login"],
  },

  robots: {
    disallow: ["/dashboard"],
  },

  imports: {
    dirs: ["stores"],
  },

  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});
