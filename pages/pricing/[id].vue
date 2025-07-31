<template>
  <!-- Loading state with modern spinner -->
  <div v-if="pending" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div class="text-center">
      <div class="relative">
        <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <div class="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin absolute top-2 left-1/2 transform -translate-x-1/2 opacity-60"></div>
      </div>
      <p class="text-gray-600 dark:text-gray-300 animate-pulse">Memuat informasi paket...</p>
    </div>
  </div>

  <!-- Main content -->
  <div v-else class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Hero section -->
    <div class="relative overflow-hidden bg-accent py-12">      
      <div class="relative max-w-6xl mx-auto px-4 text-center">
        <Motion 
          :initial="{ opacity: 0, y: -30 }" 
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
        >
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Detail Paket
            <span class="text-accent-foreground">
              {{ data?.name }}
            </span>
          </h1>
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Silahkan melihat detail dari paket yang anda pilih dan diharapkan untuk mengisi lengkap form untuk melanjutkan konsultasi
          </p>
        </Motion>
      </div>
    </div>

    <!-- Main content grid -->
    <div class="max-w-7xl mx-auto py-16 px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        <!-- Left: Form Section -->
        <Motion 
          :initial="{ opacity: 0, x: -50 }" 
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          class="order-2 lg:order-1"
        >
          <div class="sticky top-8">
            <UiCard class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border-0 overflow-hidden">
              <UiCardContent class="p-0">
                <UiCardHeader class="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 p-8 border-b border-gray-100 dark:border-gray-700">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <FormInput class="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <UiCardTitle class="text-2xl text-gray-800 dark:text-white">Informasi Pemesanan</UiCardTitle>
                      <UiCardDescription class="text-gray-600 dark:text-gray-300 text-base mt-2 leading-relaxed">
                        Isi formulir di bawah untuk mendapatkan konsultasi gratis dan penawaran khusus
                      </UiCardDescription>
                    </div>
                  </div>
                </UiCardHeader>
                <PricingUserForm :id="route.params.id as string" />
              </UiCardContent>
            </UiCard>
          </div>
        </Motion>

        <!-- Right Package Summary -->
        <Motion 
          :initial="{ opacity: 0, x: 50 }" 
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.6, delay: 0.4 }"
          class="order-1 lg:order-2"
        >
          <div class="space-y-8">
            <!-- Package Summary Card -->
            <PricingPackageSummary :plan="data" />

            <!-- Process Steps -->
            <Motion 
              :initial="{ opacity: 0, y: 30 }" 
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.6, delay: 1.0 }"
            >
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden">
                <div class="bg-gradient-to-r from-sky-500 to-blue-600 p-4">
                  <h4 class="text-white font-semibold text-center flex items-center justify-center space-x-2">
                    <Zap class="w-5 h-5" />
                    <span>Proses Mudah & Cepat</span>
                  </h4>
                </div>
                <div class="p-6 space-y-4">
                  <div class="flex items-center space-x-4">
                    <div class="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <span class="text-sm text-gray-700 dark:text-gray-200">Isi formulir kontak</span>
                  </div>
                  <div class="flex items-center space-x-4">
                    <div class="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <span class="text-sm text-gray-700 dark:text-gray-200">Konsultasi dengan tim ahli</span>
                  </div>
                  <div class="flex items-center space-x-4">
                    <div class="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <span class="text-sm text-gray-700 dark:text-gray-200">Implementasi & go-live</span>
                  </div>
                </div>
              </div>
            </Motion>
          </div>
        </Motion>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PricingPlan } from '~/server/db/schema';
import { 
  CheckCircle, 
  Clock, 
  Shield, 
  Award, 
  TrendingUp, 
  Zap, 
  FormInput 
} from "lucide-vue-next";

const route = useRoute();
const { data, pending } = await useLazyFetch<PricingPlan>(`/api/price/${route.params.id}`);

useHead({
  title: () => `Paket ${data.value?.name} - Solusi Kesehatan Digital`,
  meta: [{ 
    name: "description", 
    content: () => `${data.value?.description} - Dapatkan konsultasi gratis dan penawaran khusus untuk institusi kesehatan Anda.` 
  }],
});
</script>