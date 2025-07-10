<template>
  <section id="contact">
    <div class="bg-accent">
      <div class="container mx-auto py-20">
        <Motion
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, ease: 'easeOut' }"
          class="text-foreground text-center space-y-6">
          <Motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }">
            <h1
              class="font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
              Ayo Hubungi Kami
            </h1>
          </Motion>
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.4, ease: 'easeOut' }">
            <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
              Kami siap membantu Anda. Silakan hubungi kami untuk pertanyaan,
              saran, atau kerjasama lebih lanjut.
            </p>
          </Motion>
        </Motion>
      </div>
    </div>
    <div
      class="bg-gradient-to-b from-accent from-35% to-transparent to-35% pb-24 px-0 sm:px-8">
      <ContactCard />
    </div>
  </section>
</template>

<script lang="ts" setup></script>
