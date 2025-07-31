<script setup>
const settingStore = useSettingStore();

const { setting, loading } = storeToRefs(settingStore);
</script>

<template>
  <footer class="relative mt-auto bg-accent">
    <div
      class="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
      <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
        <NuxtLink
          to="/"
          class="flex text-surface-700 dark:text-surface-100 font-medium items-center md:justify-start justify-center">
          <NuxtImg
            class="w-10"
            :src="setting.logo ? setting.logo : '/favicon.png'"
            alt="logo" />
          <span class="ml-3 text-xl font-semibold">{{
            setting?.companyName
          }}</span>
        </NuxtLink>
        <p class="mt-2 text-sm text-surface-700 dark:text-surface-300">
          {{ setting?.moto }}
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
              <NuxtLink to="/about" class="cursor-pointer text-muted-foreground hover:text-primary"
                >Tentang Kami</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/features" class="cursor-pointer text-muted-foreground hover:text-primary"
                >Layanan</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/pricing" class="cursor-pointer text-muted-foreground hover:text-primary"
                >Harga / Paket</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/contact" class="cursor-pointer text-muted-foreground hover:text-primary"
                >Kontak</NuxtLink
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
              <NuxtLink to="#" class="cursor-pointer text-muted-foreground hover:text-primary"
                >Dokumentasi</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="#" class="cursor-pointer text-muted-foreground hover:text-primary"
                >Blog</NuxtLink
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
            <UiBadge
              class="capitalize"
              v-for="(tag, index) in setting?.keywords"
              :key="index"
              >{{ tag }}</UiBadge
            >
          </div>
        </div>
      </div>
    </div>
    <UiSeparator class="container mx-auto bg-accent-foreground" />
    <div>
      <div class="container mx-auto py-4 flex flex-wrap flex-col sm:flex-row">
        <p class="text-gray-500 text-sm text-center sm:text-left">
          © {{ new Date().getFullYear() }} {{ setting?.companyName }} —
          <NuxtLink to="#" class="text-accent-foreground font-semibold ml-1"
            >PT. Digital Kreasi Muslim</NuxtLink
          >
        </p>
        <span
          class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
          <NuxtLink
            v-if="setting?.youtube"
            :to="setting?.youtube"
            target="_blank"
            class="ml-3 cursor-pointer text-primary hover:text-primary/70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              viewBox="0 0 24 24">
              <!-- Icon from Remix Icon by Remix Design - https://github.com/Remix-Design/RemixIcon/blob/master/License -->
              <path
                fill="currentColor"
                d="M12.244 4c.534.003 1.87.016 3.29.073l.504.022c1.429.067 2.857.183 3.566.38c.945.266 1.687 1.04 1.938 2.022c.4 1.56.45 4.602.456 5.339l.001.152v.174c-.007.737-.057 3.78-.457 5.339c-.254.985-.997 1.76-1.938 2.022c-.709.197-2.137.313-3.566.38l-.504.023c-1.42.056-2.756.07-3.29.072l-.235.001h-.255c-1.13-.007-5.856-.058-7.36-.476c-.944-.266-1.687-1.04-1.938-2.022c-.4-1.56-.45-4.602-.456-5.339v-.326c.006-.737.056-3.78.456-5.339c.254-.985.997-1.76 1.939-2.021c1.503-.419 6.23-.47 7.36-.476zM9.999 8.5v7l6-3.5z" />
            </svg>
          </NuxtLink>
          <NuxtLink
            v-if="setting?.twitter"
            :to="setting?.twitter"
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
            v-if="setting?.instagram"
            :to="setting?.instagram"
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
            v-if="setting?.linkedin"
            :to="setting?.linkedin"
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
