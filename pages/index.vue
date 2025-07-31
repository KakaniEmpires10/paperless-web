<template>
  <HomeHero />
  <HomeLogos />
  <HomeAbout />
  <HomeWhy />
  <HomeFeatures />
  <HomeClient />
  <HomeCTA />
</template>

<script lang="ts" setup>
const settingStore = useSettingStore()
const { setting } = storeToRefs(settingStore)

useHead({
  title: () => setting.value?.companyName,
  titleTemplate: null
})
</script>