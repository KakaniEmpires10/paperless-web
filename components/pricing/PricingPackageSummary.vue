<script setup lang="ts">
import type { PricingPlan } from "~/server/db/schema";
import { CheckCircle, Star } from "lucide-vue-next";

const props = defineProps<{
  plan: PricingPlan | null;
}>();

const instance = computed(() =>
  props.plan?.type == "rs" ? "Rumah Sakit" : "Klinik"
);
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <!-- Header -->
    <div class="bg-sky-500 p-6 text-white">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-xl font-semibold">{{ plan?.name }}</h2>
        <UiBadge class="bg-white/20 text-white border-white/30">
          {{ instance }}
        </UiBadge>
      </div>
      <p class="text-sky-100 text-sm">{{ plan?.description }}</p>
    </div>

    <!-- Price section -->
    <div class="p-6 border-b border-gray-100 dark:border-gray-700">
      <div class="flex items-end justify-between">
        <div>
          <p class="text-sm text-muted-foreground mb-1">Harga Paket</p>
          <span class="text-2xl font-bold text-foreground">
            {{ formatMoney(parseInt(plan?.price!)) }}
          </span>
        </div>
        <p class="text-sm font-semibold text-muted-foreground">
          /Bulan
        </p>
      </div>
    </div>

    <!-- Features section -->
    <div class="p-6">
      <h3 class="font-medium text-foreground mb-4">Fitur Paket</h3>
      <div class="space-y-3">
        <div 
          v-for="(feature, i) in plan?.features" 
          :key="i"
          class="flex items-start space-x-3">
          <CheckCircle class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
          <span class="text-sm text-muted-foreground">{{ feature }}</span>
        </div>
      </div>
    </div>

    <!-- Info section -->
    <div class="p-6 bg-accent border-t border-gray-100 dark:border-gray-700 text-center">
      <p class="text-sm text-muted-foreground">
        Silakan isi form untuk konsultasi lebih lanjut
      </p>
    </div>
  </div>
</template>