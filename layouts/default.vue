<template>
  <NuxtRouteAnnouncer />
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const route = useRoute();
const siteUrl = config.public.siteUrl;

const settingStore = useSettingStore();
const { setting } = storeToRefs(settingStore);

const keyword = computed(() =>
  Array.isArray(setting.value?.keywords) ? setting.value.keywords.join(",") : ""
);

const favicon = computed(() =>
  setting.value?.logo ? setting.value?.logo : "/favicon.png"
);

useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? `${titleChunk} %separator %siteAbbr` : "%siteName";
  },
  templateParams: {
    siteAbbr: () => setting.value?.companyAbbr,
    siteName: () => setting.value?.companyName,
    separator: "|",
  },
  link: [
    { rel: "canonical", href: `${siteUrl}${route.path}` },
    { rel: "icon", type: "image/x-icon", href: favicon },
  ],
  meta: [
    { name: "description", content: () => setting.value?.excerpt },
    { name: "keywords", content: keyword },
    { name: "language", content: "Indonesian" },
    { name: "geo.region", content: "ID" },
    { name: "geo.country", content: "Indonesia" },

    //open graph
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: () => setting.value?.companyName },
    { property: "og:locale", content: "id_ID" },
    { property: "og:image", content: `${siteUrl}/og-image-paperless.png` },
    { property: "og:url", content: `${siteUrl}${route.path}` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },

    // Additional SEO Meta
    { name: "theme-color", content: "#1e40af" },
    { name: "msapplication-TileColor", content: "#1e40af" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
  ],
});
</script>
