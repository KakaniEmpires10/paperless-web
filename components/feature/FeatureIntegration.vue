<template>
  <Motion
    :initial="{ opacity: 0, y: 50 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }"
    class="bg-accent rounded-2xl pt-16">
    <div class="text-center">
      <h2 class="text-3xl font-bold mb-4 text-foreground">
        Integrasi Layanan Digital
      </h2>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        Sistem kami terhubung dengan berbagai layanan pemerintahan untuk
        memudahkan dan meningkatkan efisiensi operasional rumah sakit Anda.
      </p>
    </div>
    <ClientOnly class="-mt-16">
      <div
        ref="containerRef"
        class="relative flex h-[500px] w-full items-center justify-center overflow-hidden">
        <div
          class="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
          <div class="flex flex-row items-center justify-between">
            <div
              ref="div1Ref"
              class="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:text-black">
              <Icon name="devicon:azure" size="24" />
            </div>
            <div
              ref="div5Ref"
              class="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
              <Icon name="logos:google-drive" size="24" />
            </div>
          </div>
          <div class="flex flex-row items-center justify-between">
            <div
              ref="div2Ref"
              class="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:text-black">
              <NuxtImg src="/logo-bpjs.webp" alt="bpjs_logo" />
            </div>
            <div
              ref="div4Ref"
              class="z-10 flex size-16 items-center justify-center rounded-full border-2 bg-white p-2 text-black shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
              <NuxtImg src="/favicon.png" class="w-24" alt="paperless_logo" />
            </div>
            <div
              ref="div6Ref"
              class="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
              <NuxtImg src="/logo-antrol.webp" alt="mobile_jkn_logo" />
            </div>
          </div>
          <div class="flex flex-row items-center justify-between">
            <div
              ref="div3Ref"
              class="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:text-black">
              <NuxtImg src="/inacbg-logo.png" alt="inacbg_logo" />
            </div>
            <div
              ref="div7Ref"
              class="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
              <NuxtImg src="/satu-sehat-logo.png" alt="satu_sehat_logo" />
            </div>
          </div>
        </div>

        <UiAnimatedBeam
          :container-ref="containerRef"
          :from-ref="div1Ref"
          :to-ref="div4Ref"
          :curvature="-75"
          :end-y-offset="-10" />
        <UiAnimatedBeam
          :container-ref="containerRef"
          :from-ref="div2Ref"
          :to-ref="div4Ref" />
        <UiAnimatedBeam
          :container-ref="containerRef"
          :from-ref="div3Ref"
          :to-ref="div4Ref"
          :curvature="75"
          :end-y-offset="10" />
        <UiAnimatedBeam
          :container-ref="containerRef"
          :from-ref="div5Ref"
          :to-ref="div4Ref"
          :curvature="-75"
          :end-y-offset="-10" />
        <UiAnimatedBeam
          :container-ref="containerRef"
          :from-ref="div6Ref"
          :to-ref="div4Ref" />
        <UiAnimatedBeam
          :container-ref="containerRef"
          :from-ref="div7Ref"
          :to-ref="div4Ref"
          :curvature="75"
          :end-y-offset="10" />
      </div>
    </ClientOnly>
  </Motion>
</template>

<script lang="ts" setup>
const containerRef = ref(null);
const div1Ref = ref(null);
const div2Ref = ref(null);
const div3Ref = ref(null);
const div4Ref = ref(null);
const div5Ref = ref(null);
const div6Ref = ref(null);
const div7Ref = ref(null);
</script>
