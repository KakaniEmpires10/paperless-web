<template>
  <div class="space-y-6">
    <!-- Empty State -->
    <UiCard v-if="prices.length === 0" class="p-12 text-center border-dashed border-2 border-gray-200">
      <div class="space-y-6">
        <div class="mx-auto w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
          <svg
            class="w-10 h-10 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="space-y-3">
          <h3 class="text-xl font-semibold text-gray-900">
            Belum Ada Paket Tersedia
          </h3>
          <p class="text-gray-600 max-w-md mx-auto leading-relaxed">
            Mulai tambahkan paket layanan untuk ditampilkan kepada calon pelanggan Anda.
          </p>
          <div class="pt-4">
            <UiButton as-child>
              <NuxtLink to="/dashboard/prices/add" class="inline-flex items-center gap-2">
                <Icon name="lucide:plus" class="w-4 h-4" />
                Tambah Paket Pertama
              </NuxtLink>
            </UiButton>
          </div>
        </div>
      </div>
    </UiCard>

    <!-- Pricing Cards Grid -->
    <div 
      v-else 
      class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      <DashboardPriceCard
        v-for="price in prices"
        :key="price.id"
        :pricing="price"
        @refresh="$emit('refresh')" 
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PricingPlan } from "~/server/db/schema";

defineProps<{ prices: PricingPlan[] | [] }>();
defineEmits<{ refresh: [] }>()
</script>