<template>
  <UiCard class="group relative overflow-hidden bg-white/70 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
    <UiCardContent class="p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-600 mb-1">{{ label }}</p>
          <p class="text-2xl font-bold text-gray-900">{{ value }}</p>
        </div>
        <UiAvatar :class="['p-2 flex justify-center items-center transition-transform group-hover:scale-110', iconBg]">
          <component :is="icon" :class="['w-6 h-6', iconColor]" />
        </UiAvatar>
      </div>
      
      <div class="flex items-center text-sm">
        <TrendingUp class="w-4 h-4 text-emerald-500 mr-1" />
        <UiBadge variant="success" class="text-emerald-600 font-medium bg-transparent p-0">{{ change }}</UiBadge>
        <span class="text-gray-500 ml-2">{{ period }}</span>
      </div>
      
      <div :class="['absolute inset-x-0 bottom-0 h-1 rounded-full', gradient]"></div>
    </UiCardContent>
  </UiCard>
</template>

<script setup lang="ts">
import { TrendingUp } from "lucide-vue-next";

interface Props {
  label: string;
  value: string;
  change: string;
  period: string;
  icon: any;
  iconBg: string;
  iconColor: string;
  gradient: string;
}

defineProps<Props>();
</script>