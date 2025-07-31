<template>
  <section id="features">
    <!-- Hero Section -->
    <div class="bg-accent">
      <div class="container mx-auto pt-20 pb-14">
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
              Fitur Kami
            </h1>
          </Motion>

          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.4, ease: 'easeOut' }">
            <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
              Kami menghadirkan fitur-fitur unggulan yang dirancang untuk
              meningkatkan efisiensi operasional dan kualitas layanan kesehatan.
            </p>
          </Motion>
        </Motion>
      </div>
    </div>

    <!-- Main Features Section -->
    <div class="container mx-auto px-4 py-20">
      <!-- Detailed Features Grid -->
      <FeatureList />

      <!-- Integration Section -->
      <FeatureIntegration />
    </div>
  </section>
</template>

<script lang="ts" setup>
useHead({
  title: "Fitur",
  meta: [
    {
      name: "description",
      content:
        "Temukan berbagai fitur unggulan aplikasi rumah sakit seperti registrasi pasien, bridging BPJS dan JKN online, serta rekam medis elektronik yang mendukung pelayanan kesehatan lebih efisien dan paperless.",
    }
  ],
});
</script>
