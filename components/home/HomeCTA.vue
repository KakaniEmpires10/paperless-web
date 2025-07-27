<template>
  <section id="cta" class="container mx-auto px-4 py-24">
    <Motion
      :initial="{ opacity: 0, y: 50 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, ease: 'easeOut' }"
      class="text-center">
      <div
        class="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl p-12 md:p-16 border border-primary/20 backdrop-blur-sm relative overflow-hidden bg-texture">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div
            class="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full blur-2xl"></div>
          <div
            class="absolute bottom-0 right-0 w-48 h-48 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div class="max-w-4xl mx-auto space-y-10 relative z-10">
          <div class="space-y-6">
            <UiBadge variant="soft" rounded="pill" size="lg" class="mb-4">
              <Icon name="mdi:rocket-launch" class="mr-2" />
              Mulai Transformasi
            </UiBadge>
            <h2
              class="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Siap Bertransformasi Menjadi
              <span
                class="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Rumah Sakit Digital?
              </span>
            </h2>
            <p
              class="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto">
              Bergabunglah dengan puluhan rumah sakit di Indonesia yang telah
              merasakan manfaat teknologi AI dalam meningkatkan kualitas
              pelayanan kesehatan dan efisiensi operasional.
            </p>
          </div>

          <div
            class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              class="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-10 py-4 rounded-2xl font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              <Icon name="lucide:tag" class="mr-2 inline" />
              Lihat Paket
            </button>
            <button
              class="border-2 border-border hover:border-primary/50 text-foreground px-10 py-4 rounded-2xl font-semibold hover:bg-accent/50 transition-all duration-300 hover:scale-105">
              <Icon name="lucide:phone" class="mr-2 inline" />
              Konsultasi Sekarang
            </button>
          </div>

          <!-- Trust Indicators -->
          <div
            class="flex flex-wrap justify-center items-center gap-8 pt-8 opacity-60">
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="mdi:shield-check" class="text-green-500" />
              <span>ISO 27001 Certified</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="mdi:clock-fast" class="text-blue-500" />
              <span>24/7 Support</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="mdi:account-group" class="text-purple-500" />
              <span>14+ Rumah Sakit</span>
            </div>
          </div>
        </div>
      </div>
    </Motion>
  </section>
</template>

<style scoped>
.bg-texture {
  background-image: url("https://www.transparenttextures.com/patterns/xv.png");
}
</style>
