<template>
  <div class="space-y-6">
    <!-- Empty State -->
    <UiCard
      v-if="features.length === 0"
      class="p-12 text-center border-dashed border-2 border-gray-200">
      <div class="space-y-6">
        <div
          class="mx-auto w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-amber-500"
            width="45"
            height="45"
            viewBox="0 0 24 24">
            <!-- Icon from Myna UI Icons by Praveen Juge - https://github.com/praveenjuge/mynaui-icons/blob/main/LICENSE -->
            <g fill="currentColor">
              <path
                d="M12.305 3.315a.75.75 0 0 0-.61 0l-9 4a.75.75 0 0 0 0 1.37l9 4a.75.75 0 0 0 .61 0l9-4a.75.75 0 0 0 0-1.37z" />
              <path
                d="M3.305 11.315a.75.75 0 0 0-.61 1.37l9 4a.75.75 0 0 0 .61 0l9-4a.75.75 0 0 0-.61-1.37L12 15.179z" />
              <path
                d="M3.305 15.315a.75.75 0 0 0-.61 1.37l9 4a.75.75 0 0 0 .61 0l9-4a.75.75 0 0 0-.61-1.37L12 19.179z" />
            </g>
          </svg>
        </div>
        <div class="space-y-3">
          <h3 class="text-xl font-semibold text-gray-900">
            Belum Ada Fitur yang di-input
          </h3>
          <p class="text-gray-600 max-w-md mx-auto leading-relaxed">
            Mulai tambahkan fitur aplikas untuk ditampilkan kepada calon
            pelanggan Anda.
          </p>
          <div class="pt-4">
            <UiButton as-child>
              <NuxtLink
                to="/dashboard/features/add"
                class="inline-flex items-center gap-2">
                <Icon name="lucide:plus" class="w-4 h-4" />
                Tambah Fitur Pertama
              </NuxtLink>
            </UiButton>
          </div>
        </div>
      </div>
    </UiCard>

    <!-- Pricing Cards Grid -->
    <div v-else class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <DashboardFeatureCard
        v-for="feature in features"
        :key="feature.id"
        :feature="feature"
        @refresh="$emit('refresh')" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Feature } from "~/server/db/schema";

defineProps<{ features: Feature[] | [] }>();
defineEmits<{ refresh: [] }>();
</script>
