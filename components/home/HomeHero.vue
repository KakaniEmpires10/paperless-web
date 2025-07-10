<template>
  <section class="relative py-12" id="hero">
    <div class="flex flex-col w-full items-center gap-4">
      <!-- Animated Badge -->
      <Motion
        :initial="{ opacity: 0, y: -20, scale: 0.8 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }">
        <UiBadge rounded="pill" size="lg" variant="ghost" class="mb-4 z-10"
          ><Icon name="material-symbols-light:docs" /> Fokus pada Pasien
          Anda</UiBadge
        >
      </Motion>

      <div class="whitespace-pre-wrap text-center max-w-2xl space-y-4 px-4">
        <!-- Animated Title -->
        <Motion
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }">
          <h1
            class="z-10 relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-[4rem]">
            Tingkatkan Pelayanan Kesehatan dengan
            <Motion
              :initial="{ opacity: 0, scale: 0.8 }"
              :animate="{ opacity: 1, scale: 1 }"
              :transition="{ duration: 0.6, delay: 0.6, ease: 'easeOut' }"
              class="inline-block">
              <span class="bg-primary bg-clip-text text-transparent"
                >Modern AI</span
              >
            </Motion>
          </h1>
        </Motion>

        <!-- Animated Description -->
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.4, ease: 'easeOut' }">
          <p class="z-10 relative text-sm sm:text-base md:text-lg">
            Kami adalah tenaga ahli dalam menyediakan programmer berpengalaman
            dan meng-implementasi kecerdasan buatan (AI) untuk instansi
            kesehatan.
          </p>
        </Motion>

        <!-- Animated Buttons -->
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.6, ease: 'easeOut' }"
          class="z-10 relative flex flex-col sm:flex-row place-self-center w-full sm:w-fit gap-4 mt-8">
          <Motion
            :initial="{ opacity: 0, x: -20 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.6, delay: 0.8, ease: 'easeOut' }"
            :whileHover="{ scale: 1.05 }"
            :whileTap="{ scale: 0.95 }"
            class="w-full sm:w-auto">
            <UiButton class="w-full sm:w-auto" as-child
              ><NuxtLink to="/contact"
                ><Icon name="lucide:phone" /> Hubungi Kami</NuxtLink
              ></UiButton
            >
          </Motion>
          <!-- <Motion
            :initial="{ opacity: 0, x: 20 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.6, delay: 1, ease: 'easeOut' }"
            :whileHover="{ scale: 1.05 }"
            :whileTap="{ scale: 0.95 }"
            class="w-full sm:w-auto">
            <UiButton variant="outline" class="w-full sm:w-auto"
              ><Icon name="catppuccin:folder-docs" /> Dokumentasi</UiButton
            >
          </Motion> -->
          <Motion
            :initial="{ opacity: 0, x: 20 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.6, delay: 1, ease: 'easeOut' }"
            :whileHover="{ scale: 1.05 }"
            :whileTap="{ scale: 0.95 }"
            class="w-full sm:w-auto">
            <UiButton as-child variant="outline">
              <NuxtLink to="/pricing">
                <Icon name="lucide:tag" />
                Lihat Paket
              </NuxtLink>
            </UiButton>
          </Motion>
        </Motion>
      </div>

      <!-- Animated Carousel -->
      <Motion
        :initial="{ opacity: 0, y: 50, scale: 0.9 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ duration: 1, delay: 0.8, ease: 'easeOut' }"
        class="z-10 w-full mt-8 max-w-6xl">
        <UiCarousel
          class="w-full border-4 border-primary/50 rounded-xl overflow-hidden shadow shadow-primary"
          :plugins="[plugin]"
          :opts="{ loop: true }"
          @mouseenter="plugin.stop"
          @mouseleave="[plugin.reset(), plugin.play()]">
          <UiCarouselContent>
            <UiCarouselItem v-for="img in images" :key="img.alt">
              <UiCard
                class="relative border-0 rounded-none aspect-[2/1] before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/30 before:via-black/10 before:to-transparent before:z-10">
                <NuxtImg
                  class="absolute top-0 left-0 size-full object-cover object-center"
                  :src="img.imageSrc"
                  :alt="img.alt" />
              </UiCard>
            </UiCarouselItem>
          </UiCarouselContent>
        </UiCarousel>
      </Motion>
    </div>

    <!-- Animated Background Pattern -->
    <Motion
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 1.5, delay: 0.3, ease: 'easeOut' }">
      <UiInteractiveGridPattern
        :class="[
          '[mask-image:radial-gradient(800px_600px_at_center,white,transparent)]',
          'absolute top-0',
        ]"
        :squares="[38, 13]"
        squares-class-name="hover:fill-accent" />
    </Motion>
  </section>
</template>

<script lang="ts" setup>
import Autoplay from "embla-carousel-autoplay";

const plugin = Autoplay({
  delay: 4000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
});

const images = ref([
  {
    imageSrc: "/images/hero/Hero_img_1.png",
    alt: "hero img 1",
  },
  {
    imageSrc: "/images/hero/Hero_img_2.png",
    alt: "hero img 2",
  },
  {
    imageSrc: "/images/hero/Hero_img_3.png",
    alt: "hero img 3",
  },
  {
    imageSrc: "/images/hero/Hero_img_4.png",
    alt: "hero img 4",
  },
]);
</script>
