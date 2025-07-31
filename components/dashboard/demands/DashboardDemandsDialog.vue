<template>
  <UiDialog :open="props.isOpen" @update:open="emit('update:open', $event)">
    <UiDialogContent class="sm:max-w-2xl overflow-hidden">
      <!-- Header with gradient background -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 -mx-6 -mt-6 px-6 pt-6 pb-4 border-b">
        <UiDialogHeader>
          <div class="flex items-center gap-3">
            <div class="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Mail class="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <UiDialogTitle class="text-xl">Detail Pesan</UiDialogTitle>
              <UiDialogDescription class="text-sm text-muted-foreground mt-1">
                Pesan yang dikirim dari halaman kontak pada landing page
              </UiDialogDescription>
            </div>
          </div>
        </UiDialogHeader>
      </div>

      <!-- Content with cards -->
      <div class="space-y-6 py-6">
        <!-- Contact Information Card -->
        <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border">
          <h3 class="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            Informasi Kontak
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-xs font-medium text-blue-600 dark:text-blue-400">N</span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-xs text-muted-foreground">Nama Lengkap</p>
                  <p class="font-medium text-sm truncate">{{ demands?.name || '-' }}</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-xs font-medium text-green-600 dark:text-green-400">@</span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-xs text-muted-foreground">Email</p>
                  <p class="font-medium text-sm truncate">{{ demands?.email || '-' }}</p>
                </div>
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-xs font-medium text-purple-600 dark:text-purple-400">I</span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-xs text-muted-foreground">Instansi</p>
                  <p class="font-medium text-sm truncate">{{ demands?.instanceName || '-' }}</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-xs font-medium text-orange-600 dark:text-orange-400">T</span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-xs text-muted-foreground">No. Telepon</p>
                  <p class="font-medium text-sm">{{ demands?.phone || '-' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Package Information Card -->
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg p-4 border border-amber-200/50 dark:border-amber-800/50">
          <h3 class="font-semibold text-sm text-amber-700 dark:text-amber-300 mb-3 flex items-center gap-2">
            <div class="w-2 h-2 bg-amber-500 rounded-full"></div>
            Paket yang Diminati
          </h3>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-lg flex items-center justify-center">
              <span class="text-sm font-bold text-amber-600 dark:text-amber-400">📦</span>
            </div>
            <div>
              <p class="font-semibold text-amber-900 dark:text-amber-100">
                {{ demands?.pricing?.name || 'Tidak dipilih' }}
              </p>
              <p class="text-xs text-amber-600 dark:text-amber-400">
                Paket yang dipilih dari landing page
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer with enhanced buttons -->
      <UiDialogFooter class="border-t pt-6 gap-3">
        <UiButton variant="outline" @click="$emit('close')" class="flex-1 sm:flex-none">
          Tutup
        </UiButton>
        <UiButton as-child class="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
          <a :href="`mailto:${demands?.email}`" class="inline-flex items-center gap-2">
            <Mail class="size-4" />  
            Balas Email
          </a>
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>

<script lang="ts" setup>
import { Mail } from 'lucide-vue-next';
import type { Demands } from './demands.constant';

const props = defineProps<{
  isOpen: boolean;
  demands: Demands | null;
}>();

const emit = defineEmits<{
  "update:open": [value: boolean];
  close: [];
  refresh: [];
}>();
</script>