<template>
  <Motion
    :initial="{ opacity: 0, y: 50, scale: 0.95 }"
    :animate="{ opacity: 1, y: 0, scale: 1 }"
    :transition="{ duration: 0.8, delay, ease: 'easeOut' }"
    class="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-xl border transition-all duration-500 overflow-hidden hover:shadow-2xl hover:scale-105"
    :class="[
      isPopular 
        ? 'border-2 border-sky-500 ring-4 ring-sky-100 dark:ring-sky-900/50' 
        : 'border-gray-200 dark:border-gray-700 hover:border-sky-300 dark:hover:border-sky-600'
    ]"
  >
    <!-- Popular Badge dengan animasi -->
    <div v-if="isPopular" class="absolute -top-1 left-1/2 transform -translate-x-1/2 z-20">
      <Motion
        :animate="{ 
          y: [0, -2, 0],
          boxShadow: [
            '0 4px 20px rgba(99, 102, 241, 0.3)',
            '0 8px 30px rgba(99, 102, 241, 0.4)',
            '0 4px 20px rgba(99, 102, 241, 0.3)'
          ]
        }"
        :transition="{ duration: 3, repeat: Infinity, ease: 'easeInOut' }"
        class="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wide shadow-lg"
      >
        ⭐ TERPOPULER
      </Motion>
    </div>

    <!-- Background Decorative Elements -->
    <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-500/10 to-blue-600/10 rounded-full -translate-y-16 translate-x-16"></div>
    <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-sky-400/10 to-cyan-500/10 rounded-full translate-y-12 -translate-x-12"></div>

    <div :class="cn('relative flex flex-col h-full p-8', isPopular ? 'pt-16' : 'pt-8')">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <div class="mb-4">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300">
            {{ name }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {{ excerpt }}
          </p>
        </div>
        
        <!-- Price Display dengan animasi -->
        <Motion
          :whileHover="isPopular ? { scale: 1.02 } : {}"
          :transition="{ duration: 0.3, ease: 'easeInOut' }"
          class="relative"
        >
          <div class="text-5xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent pb-2">
            Rp {{ formatMoney(parseInt(price), { short: true }) }}
          </div>
          <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">per bulan</p>
        </Motion>
      </div>

      <!-- Features List dengan improved styling -->
      <div class="flex-grow mb-8">
        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
          Fitur Termasuk:
        </h4>
        <ul class="space-y-3">
          <Motion
            v-for="(feature, index) in features"
            :key="index"
            :initial="{ opacity: 0, x: -20 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.5, delay: delay + 0.1 * index }"
            class="flex items-start space-x-3 group/feature"
          >
            <div class="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center mt-0.5 group-hover/feature:scale-110 transition-transform duration-200">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed group-hover/feature:text-gray-900 dark:group-hover/feature:text-white transition-colors duration-200">
              {{ feature }}
            </span>
          </Motion>
        </ul>
      </div>

      <!-- CTA Button dengan improved styling -->
      <NuxtLink class="mt-auto group/btn" :to="'/pricing/' + id">
        <Motion
          :whileHover="{ scale: 1.02 }"
          class="relative w-full overflow-hidden"
        >
          <button 
            class="w-full relative bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800"
            :class="[
              isPopular 
                ? 'bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg' 
                : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-sky-500 hover:to-sky-600'
            ]"
          >
            <!-- Button Background Animation -->
            <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            
            <span class="relative flex items-center justify-center space-x-2">
              <span>{{ isCustom ? 'Konsultasi Custom' : 'Pilih Paket' }}</span>
              <svg class="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </button>
        </Motion>
      </NuxtLink>
    </div>
  </Motion>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils';

defineProps<{
  id: string
  name: string
  excerpt: string
  description: string | null
  features: string[]
  price: string
  isPopular: boolean
  isCustom?: boolean
  delay: number
}>()
</script>