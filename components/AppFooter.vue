<script setup>
const {data: settingData} = await useFetch("/api/settings", {
  pick: ["companyName", "moto", "keywords", "twitter", "instagram", "linkedin"]
});
</script>

<template>
  <footer class="relative mt-auto bg-accent">
    <div
      class="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
      <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
        <a
          class="flex text-surface-700 dark:text-surface-100 font-medium items-center md:justify-start justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-10 h-10 text-white p-2 bg-primary rounded-full"
            viewBox="0 0 24 24">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span class="ml-3 text-xl font-semibold">{{ settingData.companyName }}</span>
        </a>
        <p class="mt-2 text-sm text-surface-700 dark:text-surface-300">
          {{ settingData.moto }}
        </p>
      </div>
      <div
        class="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2
            class="title-font font-medium text-accent-foreground tracking-widest text-sm mb-3">
            Quick Links
          </h2>
          <nav class="list-none mb-10">
            <li>
              <a class="cursor-pointer text-muted-foreground hover:text-primary"
                >Tentang Kami</a
              >
            </li>
            <li>
              <a class="cursor-pointer text-muted-foreground hover:text-primary"
                >Layanan</a
              >
            </li>
            <li>
              <a class="cursor-pointer text-muted-foreground hover:text-primary"
                >Harga / Paket</a
              >
            </li>
            <li>
              <a class="cursor-pointer text-muted-foreground hover:text-primary"
                >Kontak</a
              >
            </li>
          </nav>
        </div>
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2
            class="title-font font-medium text-accent-foreground tracking-widest text-sm mb-3">
            Informasi
          </h2>
          <nav class="list-none mb-10">
            <li>
              <a class="cursor-pointer text-muted-foreground hover:text-primary"
                >Dokumentasi</a
              >
            </li>
            <li>
              <a class="cursor-pointer text-muted-foreground hover:text-primary"
                >Blog</a
              >
            </li>
          </nav>
        </div>
        <div class="md:w-1/2 w-full px-4">
          <h2
            class="title-font font-medium text-accent-foreground tracking-widest text-sm mb-3">
            Kategori
          </h2>
          <div class="flex flex-wrap justify-center md:justify-start gap-2">
            <UiBadge class="capitalize" v-for="(tag, index) in settingData.keywords" :key="index">{{
              tag
            }}</UiBadge>
          </div>
        </div>
      </div>
    </div>
    <UiSeparator class="container mx-auto bg-accent-foreground" />
    <div>
      <div class="container mx-auto py-4 flex flex-wrap flex-col sm:flex-row">
        <p class="text-gray-500 text-sm text-center sm:text-left">
          © {{ new Date().getFullYear() }} {{ settingData.companyName }} —
          <NuxtLink to="#" class="text-accent-foreground font-semibold ml-1"
            >PT. Digital Kreasi Muslim</NuxtLink
          >
        </p>
        <span
          class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
          <NuxtLink
            v-if="settingData.twitter"
            :to="settingData.twitter"
            target="_blank"
            class="ml-3 cursor-pointer text-primary hover:text-primary/70">
            <svg
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-5 h-5"
              viewBox="0 0 24 24">
              <path
          d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </NuxtLink>
          <NuxtLink
            v-if="settingData.instagram"
            :to="settingData.instagram"
            target="_blank"
            class="ml-3 cursor-pointer text-primary hover:text-primary/70">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-5 h-5"
              viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path
          d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </NuxtLink>
          <NuxtLink
            v-if="settingData.linkedin"
            :to="settingData.linkedin"
            target="_blank"
            class="ml-3 cursor-pointer text-primary hover:text-primary/70">
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="0"
              class="w-5 h-5"
              viewBox="0 0 24 24">
              <path
          stroke="none"
          d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </NuxtLink>
        </span>
      </div>
    </div>
  </footer>
</template>
