<template>
  <section
    id="features"
    class="flex flex-col items-center justify-center gap-16 py-20 px-6">
    <!-- Header Section -->
    <div class="text-center space-y-6 max-w-4xl">
      <UiBadge variant="ghost" size="lg" rounded="pill">Fitur Kami</UiBadge>
      <div class="text-foreground space-y-6">
        <h2
          class="font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
          Kami Hadirkan Beragam <br />
          <span class="bg-clip-text text-transparent font-bold bg-primary">
            Fitur Canggih Berbasis AI
          </span>
        </h2>
        <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
          Temukan berbagai fitur inovatif yang kami sediakan untuk membantu Anda
          melayani pasien lebih cepat, mudah, dan efisien. Tingkatkan kualitas
          layanan bersama solusi digital terbaik dari kami!
        </p>
      </div>
      <UiButton as-child>
        <NuxtLink to="/features">
          Lihat Fitur Lainnya
          <Icon name="lucide:arrow-right" />
        </NuxtLink>
      </UiButton>
    </div>

    <!-- Bento Grid -->
    <div class="w-full max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Main Feature - Document Compliance -->
        <div
          class="md:col-span-2 lg:col-span-2 lg:row-span-2 group relative cursor-pointer"
          @click="handleFeatureClick('compliance')">
          <UiGlowingEffect
            class="rounded-xl"
            :spread="30"
            :glow="true"
            variant="primary"
            :disabled="false"
            :proximity="40"
            :border-width="3"
            :inactive-zone="0.01" />
          <UiCard
            class="h-full transition-all duration-500 border-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50 overflow-hidden relative">
            <UiCardContent class="p-6 h-full flex flex-col justify-between">
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div
                    class="size-10 grid place-content-center bg-blue-500 rounded-xl">
                    <Icon
                      name="material-symbols:fact-check"
                      class="text-2xl text-white" />
                  </div>
                  <UiBadge variant="default" class="px-3 py-1">
                    AI Powered
                  </UiBadge>
                </div>
                <h3 class="text-2xl font-bold text-foreground">
                  Document Compliance Check
                </h3>
                <p class="text-muted-foreground text-lg leading-relaxed">
                  Sistem AI yang menganalisis dokumen klaim berdasarkan kode
                  ICD-10 dan ICD-9, membantu meminimalisir penolakan klaim dan
                  mempercepat proses persetujuan.
                </p>
              </div>

              <!-- Visual Element -->
              <div class="mt-6 relative animate-float">
                <div class="bg-background rounded-lg p-4 shadow-lg border">
                  <div class="flex items-center gap-2 mb-3">
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div class="space-y-2">
                    <div class="h-2 bg-green-400 rounded w-full"></div>
                    <div class="h-2 bg-accent rounded w-3/4"></div>
                    <div class="h-2 bg-accent rounded w-1/2"></div>
                  </div>
                </div>
                <div
                  class="absolute -top-2 -right-2 flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  <Icon name="material-symbols:check-circle" class="text-sm" />
                  Verified
                </div>
              </div>
              <div class="mt-6 relative animate-float">
                <div class="bg-background rounded-lg p-4 shadow-lg border">
                  <div class="flex items-center gap-2 mb-3">
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div class="space-y-2">
                    <div class="h-2 bg-accent rounded w-full"></div>
                    <div class="h-2 bg-yellow-400 rounded w-3/4"></div>
                    <div class="h-2 bg-accent rounded w-1/2"></div>
                  </div>
                </div>
                <div
                  class="absolute -top-2 -right-2 flex items-center gap-1 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  <Icon name="mdi:alert-circle" class="text-sm" /> Pending
                </div>
              </div>
              <div class="mt-6 relative animate-float">
                <div class="bg-background rounded-lg p-4 shadow-lg border">
                  <div class="flex items-center gap-2 mb-3">
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div class="space-y-2">
                    <div class="h-2 bg-accent rounded w-full"></div>
                    <div class="h-2 bg-accent rounded w-3/4"></div>
                    <div class="h-2 bg-red-400 rounded w-1/2"></div>
                  </div>
                </div>
                <div
                  class="absolute -top-2 -right-2 flex items-center gap-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  <Icon name="bx:bxs-x-circle" class="text-sm" /> Rejected
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </div>

        <!-- Cost Control Feature -->
        <div
          class="lg:col-span-2 group relative cursor-pointer"
          @click="handleFeatureClick('cost-control')">
          <UiGlowingEffect
            class="rounded-xl"
            :spread="30"
            :glow="true"
            variant="primary"
            :disabled="false"
            :proximity="40"
            :border-width="3"
            :inactive-zone="0.01" />
          <UiCard
            class="h-full transition-all duration-500 border-0 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 overflow-hidden">
            <UiCardContent class="p-6 h-full">
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div
                    class="size-10 grid place-content-center bg-green-500 rounded-xl">
                    <Icon
                      name="material-symbols:trending-down"
                      class="text-2xl text-white" />
                  </div>
                  <UiBadge variant="secondary" class="px-3 py-1">
                    Revenue Optimizer
                  </UiBadge>
                </div>
                <h3 class="text-xl font-bold text-foreground">
                  Patient Cost Control
                </h3>
                <p class="text-muted-foreground">
                  Prediksi potensi pendapatan rumah sakit berdasarkan kode tarif
                  dan analisis biaya real-time per pasien.
                </p>

                <!-- Mini Chart Visuals (Multiple Cards) -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <!-- Card 1 -->
                  <div
                    class="bg-background rounded-lg p-4 border shadow animate-float">
                    <div
                      class="flex items-end justify-center border-b border-b-green-400 gap-1 h-16">
                      <div class="bg-green-400 rounded-t w-4 h-8"></div>
                      <div class="bg-green-500 rounded-t w-4 h-12"></div>
                      <div class="bg-green-600 rounded-t w-4 h-16"></div>
                      <div class="bg-green-500 rounded-t w-4 h-10"></div>
                      <div class="bg-green-400 rounded-t w-4 h-6"></div>
                    </div>
                    <div class="flex items-center justify-between mt-2">
                      <span class="text-xs text-muted-foreground"
                        >This Month</span
                      >
                      <span
                        class="text-xs font-semibold text-green-600 flex items-center gap-1">
                        <Icon
                          name="lucide:arrow-up-right"
                          class="text-green-500" />
                        +12.5%
                      </span>
                    </div>
                    <div class="flex items-center justify-between mt-1">
                      <span class="text-xs text-muted-foreground"
                        >Patients</span
                      >
                      <span class="text-xs font-semibold text-foreground"
                        >1,240</span
                      >
                    </div>
                    <div class="flex items-center justify-between mt-1">
                      <span class="text-xs text-muted-foreground"
                        >Avg. Cost</span
                      >
                      <span class="text-xs font-semibold text-foreground"
                        >Rp 1,200K</span
                      >
                    </div>
                    <p class="text-xs text-muted-foreground mt-2">
                      Revenue Trend ↗
                    </p>
                  </div>
                  <!-- Card 2 -->
                  <div
                    class="bg-background rounded-lg p-4 border shadow animate-float">
                    <div
                      class="flex items-end justify-center border-b border-b-blue-400 gap-1 h-16">
                      <div class="bg-blue-400 rounded-t w-4 h-10"></div>
                      <div class="bg-blue-500 rounded-t w-4 h-14"></div>
                      <div class="bg-blue-600 rounded-t w-4 h-12"></div>
                      <div class="bg-blue-500 rounded-t w-4 h-8"></div>
                      <div class="bg-blue-400 rounded-t w-4 h-6"></div>
                    </div>
                    <div class="flex items-center justify-between mt-2">
                      <span class="text-xs text-muted-foreground"
                        >Last Month</span
                      >
                      <span
                        class="text-xs font-semibold text-blue-600 flex items-center gap-1">
                        <Icon
                          name="lucide:arrow-down-right"
                          class="text-blue-500" />
                        -3.2%
                      </span>
                    </div>
                    <div class="flex items-center justify-between mt-1">
                      <span class="text-xs text-muted-foreground"
                        >Patients</span
                      >
                      <span class="text-xs font-semibold text-foreground"
                        >1,100</span
                      >
                    </div>
                    <div class="flex items-center justify-between mt-1">
                      <span class="text-xs text-muted-foreground"
                        >Avg. Cost</span
                      >
                      <span class="text-xs font-semibold text-foreground"
                        >Rp 1,150K</span
                      >
                    </div>
                    <p class="text-xs text-muted-foreground mt-2">
                      Revenue Trend ↘
                    </p>
                  </div>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </div>

        <!-- Real-time Analytics -->
        <div
          class="group relative cursor-pointer"
          @click="handleFeatureClick('analytics')">
          <UiGlowingEffect
            class="rounded-xl"
            :spread="30"
            :glow="true"
            variant="primary"
            :disabled="false"
            :proximity="40"
            :border-width="3"
            :inactive-zone="0.01" />
          <UiCard
            class="h-full transition-all duration-500 border-0 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/50 dark:to-pink-950/50">
            <UiCardContent class="p-6 h-full flex flex-col justify-between">
              <div class="space-y-4">
                <div
                  class="size-10 grid place-content-center bg-purple-500 rounded-xl">
                  <Icon
                    name="material-symbols:analytics"
                    class="text-2xl text-white" />
                </div>
                <h3 class="text-lg font-bold text-foreground">
                  Real-time Analytics
                </h3>
                <p class="text-muted-foreground text-sm">
                  Dashboard analitik real-time untuk monitoring klaim dan
                  profitabilitas.
                </p>
              </div>

              <!-- Pulse Animation -->
              <div class="flex justify-center mt-6 animate-float">
                <div class="relative">
                  <div
                    class="w-12 h-12 bg-purple-500 rounded-full animate-pulse"></div>
                  <div
                    class="absolute inset-0 w-12 h-12 bg-purple-400 rounded-full animate-ping opacity-20"></div>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </div>

        <!-- ICD Integration -->
        <div
          class="group relative cursor-pointer"
          @click="handleFeatureClick('icd-integration')">
          <UiGlowingEffect
            class="rounded-xl"
            :spread="30"
            :glow="true"
            variant="primary"
            :disabled="false"
            :proximity="40"
            :border-width="3"
            :inactive-zone="0.01" />
          <UiCard
            class="h-full transition-all duration-500 border-0 bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950/50 dark:to-red-950/50">
            <UiCardContent class="p-6 h-full flex flex-col justify-between">
              <div class="space-y-4">
                <div
                  class="size-10 grid place-content-center bg-orange-500 rounded-xl">
                  <Icon
                    name="material-symbols:integration-instructions"
                    class="text-2xl text-white" />
                </div>
                <h3 class="text-lg font-bold text-foreground">
                  ICD-10/9 Integration
                </h3>
                <p class="text-muted-foreground text-sm">
                  Integrasi lengkap dengan sistem kode diagnosis internasional.
                </p>
              </div>

              <!-- Code Visual -->
              <div
                class="mt-4 bg-slate-900 rounded p-2 text-green-400 text-xs font-mono animate-float">
                <div>ICD-10: {{ currentIcdCode }}</div>
              </div>
            </UiCardContent>
          </UiCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// ICD Code rotation for demo
const icdCodes = ["A00.1", "B15.9", "C78.0", "D12.6", "E11.9", "F32.9"];
const currentIcdCode = ref(icdCodes[0]);
let icdInterval = null;

onMounted(() => {
  // Rotate ICD codes every 2 seconds
  icdInterval = setInterval(() => {
    const currentIndex = icdCodes.indexOf(currentIcdCode.value);
    const nextIndex = (currentIndex + 1) % icdCodes.length;
    currentIcdCode.value = icdCodes[nextIndex];
  }, 2000);
});

onUnmounted(() => {
  if (icdInterval) {
    clearInterval(icdInterval);
  }
});

// Event handlers
const handleFeatureClick = feature => {
  console.log(`Feature clicked: ${feature}`);
  // Add your navigation logic here
  // You can use navigateTo() from Nuxt 3 for navigation
};
</script>

<style scoped>
/* Remove the translate hover effect and background hover changes */
.group {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Smooth background transitions for light effect */
.group > * {
  transition: background 0.3s ease;
}

/* Keep the existing animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

.group:hover .animate-float {
  animation: float 2s ease-in-out infinite;
}

/* Add delay for multiple .animate-float elements */
.group:hover .animate-float:nth-child(1) {
  animation-delay: 0.2s;
}

.group:hover .animate-float:nth-child(2) {
  animation-delay: 0.3s;
}
.group:hover .animate-float:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
