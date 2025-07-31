<template>
  <section id="pricing">
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
              List Paket
            </h1>
          </Motion>

          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.4, ease: 'easeOut' }">
            <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
              Temukan paket yang sesuai dengan kebutuhan Anda. Hubungi kami
              untuk informasi lebih lanjut atau konsultasi gratis.
            </p>
          </Motion>
        </Motion>
      </div>
    </div>

    <div
      class="-mt-5 mb-20 flex justify-center flex-col items-center space-y-8">
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.6, ease: 'easeOut' }">
        <TabsPricing v-model="selectedValue" />
      </Motion>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        <!-- Skeletons loading -->
        <template v-if="pending">
          <div
            v-for="i in 3"
            :key="'skeleton-' + i"
            class="space-y-4 rounded-2xl border p-6 shadow-sm bg-background">
            <UiSkeleton class="h-6 w-1/2 rounded" />
            <UiSkeleton class="h-10 w-full rounded-xl" />
            <UiSkeleton class="h-4 w-full rounded" />
            <UiSkeleton class="h-4 w-3/4 rounded" />
            <UiSkeleton class="h-8 w-full mt-4 rounded-md" />
          </div>
        </template>

        <PricingCard
          v-else
          v-for="(plan, index) in orderedPlans"
          :key="plan.id"
          v-bind="plan"
          :delay="0.5 + index * 0.15" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
useHead({
  title: "Harga & Paket",
  meta: [
    {
      name: "description",
      content:
        "Temukan paket layanan digitalisasi rumah sakit sesuai kebutuhan Anda. Mulai dari AI Service, HMS lengkap, hingga solusi kustom untuk enterprise",
    },
  ],
});

const selectedValue = ref("rs");

const { data: priceData, pending } = await useFetch("/api/price/get-all", {
  key: "price",
});

// Menggunakan field order untuk mengurutkan paket
const orderedPlans = computed(() => {
  if (!priceData.value) return [];
  
  // Filter berdasarkan type yang dipilih
  const filtered = priceData.value.filter(p => p.type === selectedValue.value);
  
  // Urutkan berdasarkan field order (ascending)
  return filtered.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
});
</script>