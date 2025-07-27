<template>
  <section
    class="container mx-auto flex flex-col md:flex-row gap-8 items-center py-10 md:py-20 px-4"
    id="home-about">
    <article class="space-y-6 flex-1">
      <h2 class="text-3xl md:text-4xl font-semibold">Siapa Kami ?</h2>
      <UiSkeleton v-if="loading" class="w-full h-32" />
      <p class="text-base md:text-lg">
        {{ setting?.excerpt ? setting.excerpt :  'Kami adalah perusahaan yang memfokuskan diri dalam menghadirkan dan mensupport rumah sakit serta instansi kesehatan lainnya dalam meng-optimalkan pelayanan kepada pasien dengan memberikan software berbasis web dan di lengkapi dengan AI Medical Scribe dan IT support local.'}}
      </p>
      <UiButton as-child
        ><NuxtLink to="/about"
          >Tentang Kami <Icon name="lucide:arrow-right" /></NuxtLink
      ></UiButton>
    </article>
    <div
      class="border-2 border-primary rounded-xl overflow-hidden flex-1 w-full max-w-md md:max-w-none">
      <video
        poster="~assets/images/thumb_paperless.png"
        controls
        class="w-full h-auto max-h-64 md:max-h-none">
        <source src="~/assets/videos/intro.mp4" type="video/mp4" />
        <source src="~/assets/videos/intro.webm" type="video/webm" />
      </video>
    </div>
  </section>
</template>

<script lang="ts" setup>
const settingStore = useSettingStore()

const { setting, loading } = storeToRefs(settingStore)
</script>