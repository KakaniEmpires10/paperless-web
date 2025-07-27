<template>
  <UiCard class="relative overflow-hidden transition-all duration-300 hover:shadow-xl group border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
    <!-- Featured Badge -->
    <div
      v-if="feature.isFeatured"
      class="absolute -right-8 top-4 z-10 rotate-45 bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-1 text-xs font-medium text-white shadow-lg">
      Featured
    </div>

    <!-- Status Indicator -->
    <div
      :class="[
        'absolute z-10 transition-all duration-300',
        feature.isFeatured ? 'right-4 top-16' : 'right-4 top-4',
      ]">
      <div class="flex items-center gap-2">
        <div
          :class="[
            'h-2 w-2 rounded-full transition-all duration-300',
            feature.isActive
              ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50'
              : 'bg-red-500 shadow-lg shadow-red-500/50',
          ]"></div>
        <span
          :class="[
            'text-xs font-medium transition-colors',
            feature.isActive
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-red-600 dark:text-red-400',
          ]">
          {{ feature.isActive ? "Active" : "Inactive" }}
        </span>
      </div>
    </div>

    <UiCardHeader class="pb-4">
      <!-- Visual Element -->
      <div
        class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 transition-transform duration-300 group-hover:scale-110 dark:from-blue-950/50 dark:to-indigo-900/50">
        <div
          v-if="feature.icon"
          class="text-2xl text-blue-600 dark:text-blue-400">
          <Icon :name="feature.icon" />
        </div>
        <div
          v-else-if="feature.image"
          class="h-full w-full overflow-hidden rounded-xl">
          <img
            :src="feature.image"
            :alt="feature.title"
            class="h-full w-full object-cover" />
        </div>
        <div v-else class="text-2xl text-gray-400">
          <Icon name="lucide:box" />
        </div>
      </div>

      <div class="space-y-3">
        <!-- Category Tag -->
        <div>
          <span
            class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {{ feature.category }}
          </span>
        </div>

        <!-- Title & Description -->
        <div class="space-y-2">
          <h3
            class="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {{ feature.title }}
          </h3>
          <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {{ feature.shortDescription || "No description available." }}
          </p>
        </div>
      </div>
    </UiCardHeader>

    <UiCardContent class="pt-0 space-y-4">
      <!-- Features List Collapsible Section -->
      <div
        v-if="feature.featuresList && feature.featuresList.length > 0"
        class="space-y-3">
        <UiCollapsible v-model:open="isExpanded">
          <UiCollapsibleTrigger as-child>
            <UiButton
              variant="ghost"
              size="sm"
              class="w-full justify-between rounded-lg bg-gray-50 px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800">
              <span class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Icon name="lucide:list" class="h-4 w-4" />
                Features ({{ feature.featuresList.length }})
              </span>
              <Icon
                :name="isExpanded ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                class="h-4 w-4 transition-transform duration-200" />
            </UiButton>
          </UiCollapsibleTrigger>

          <UiCollapsibleContent class="mt-3">
            <div
              class="space-y-2 rounded-lg border border-gray-200 bg-gray-50/50 p-3 dark:border-gray-700 dark:bg-gray-800/30">
              <div
                v-for="(featureItem, index) in feature.featuresList"
                :key="index"
                class="flex items-start gap-3 rounded-md bg-white p-2 shadow-sm transition-colors hover:bg-blue-50 dark:bg-gray-900/50 dark:hover:bg-blue-950/20">
                <div
                  class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></div>
                <div class="min-w-0 flex-1">
                  <p class="text-xs font-medium text-gray-900 dark:text-white">
                    {{ featureItem }}
                  </p>
                </div>
              </div>
            </div>
          </UiCollapsibleContent>
        </UiCollapsible>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <UiButton
          variant="outline"
          size="sm"
          as-child
          class="flex-1 transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 dark:hover:bg-blue-950/50 dark:hover:border-blue-700 dark:hover:text-blue-300">
          <NuxtLink
            :to="`/dashboard/features/update/${feature.id}`"
            class="flex items-center justify-center gap-2">
            <Icon name="lucide:edit-3" class="h-4 w-4" />
            Edit
          </NuxtLink>
        </UiButton>

        <UiButton variant="destructive" size="sm" @click="handleDelete">
          <Icon name="lucide:trash-2" class="h-4 w-4" />
        </UiButton>
      </div>
    </UiCardContent>

    <!-- Hover Effect Overlay - Similar to pricing card -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"></div>
  </UiCard>
</template>

<script lang="ts" setup>
import type { Feature } from "~/server/db/schema";
import { ref } from "vue";
import { toast } from "vue-sonner";

const props = defineProps<{
  feature: Feature;
}>();

const emit = defineEmits<{
  refresh: [];
}>();

const isExpanded = ref(false);

const storeDelete = useDeleteDialogStore();

const handleDelete = () => {
  storeDelete.openDialog({
    id: props.feature.id,
    name: props.feature.title,
    endpoint: '/api/features',
    title: 'Apakah Anda yakin?',
    description: `Aksi ini tidak dapat dibatalkan. Anda akan menghapus Fitur "${props.feature.title}" secara permanen.`,
    onSuccess: async () => {
      toast.success('Fitur berhasil dihapus.')
      emit('refresh')
    },
    onError: (error) => {
      toast.error('Gagal menghapus Fitur.')
      console.error('Delete error:', (error as Error).message)
    }
  })
}
</script>