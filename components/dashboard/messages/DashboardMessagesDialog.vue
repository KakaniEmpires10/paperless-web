<template>
  <UiDialog :open="props.isOpen" @update:open="emit('update:open', $event)">
    <UiDialogContent class="sm:max-w-3xl max-h-[90vh] overflow-auto">
      <!-- Artistic Header with Message Icon -->
      <div class="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/40 dark:via-teal-950/40 dark:to-cyan-950/40 -mx-6 -mt-6 px-6 pt-6 pb-6 relative overflow-hidden">
        <!-- Decorative elements -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-200/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
        
        <UiDialogHeader class="relative">
          <div class="flex items-start gap-4">
            <div class="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
              <Mail class="size-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div class="flex-1">
              <UiDialogTitle class="text-2xl bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-300 dark:to-teal-300 bg-clip-text text-transparent">
                Pesan Kontak
              </UiDialogTitle>
              <UiDialogDescription class="text-emerald-600/80 dark:text-emerald-400/80 mt-1">
                Pesan yang diterima dari formulir kontak website
              </UiDialogDescription>
              <div class="flex items-center gap-2 mt-2">
                <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span class="text-xs text-emerald-600/70 dark:text-emerald-400/70">
                  Menunggu respons
                </span>
              </div>
            </div>
          </div>
        </UiDialogHeader>
      </div>

      <!-- Main Content -->
      <div class="py-6 space-y-6">
        <!-- Sender Profile Card -->
        <div class="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-sm overflow-hidden">
          <div class="bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 px-6 py-4 border-b border-gray-200/60 dark:border-gray-700/60">
            <h3 class="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
              Informasi Pengirim
            </h3>
          </div>
          
          <div class="p-6">
            <div class="space-y-6">
              <!-- Top row: Name and Hospital -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Name -->
                <div class="group">
                  <div class="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200/30 dark:border-blue-800/30 transition-all group-hover:shadow-md">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {{ contactMessages?.name?.charAt(0)?.toUpperCase() || 'N' }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">Nama Lengkap</p>
                      <p class="font-semibold text-gray-900 dark:text-gray-100 truncate">{{ contactMessages?.name || '-' }}</p>
                    </div>
                  </div>
                </div>
                
                <!-- Hospital -->
                <div class="group">
                  <div class="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border border-purple-200/30 dark:border-purple-800/30 transition-all group-hover:shadow-md">
                    <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      🏥
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">Instansi</p>
                      <p class="font-semibold text-gray-900 dark:text-gray-100 truncate">{{ contactMessages?.hospitalName || '-' }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Email - Full Width -->
              <div class="group">
                <div class="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/30 dark:border-green-800/30 transition-all group-hover:shadow-md">
                  <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Mail class="size-6" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">Email Address</p>
                    <p class="font-semibold text-gray-900 dark:text-gray-100 break-all">{{ contactMessages?.email || '-' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Content Card -->
        <div class="bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-red-50/50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-red-950/20 rounded-2xl border border-amber-200/40 dark:border-amber-800/40 overflow-hidden">
          <div class="bg-gradient-to-r from-amber-100/60 to-orange-100/60 dark:from-amber-900/30 dark:to-orange-900/30 px-6 py-4 border-b border-amber-200/50 dark:border-amber-700/50">
            <h3 class="font-semibold text-amber-800 dark:text-amber-200 flex items-center gap-2">
              <div class="w-2 h-2 bg-amber-500 rounded-full"></div>
              Isi Pesan
            </h3>
          </div>
          
          <div class="p-6">
            <div class="relative">
              <!-- Quote decoration -->
              <div class="absolute -top-2 -left-2 text-6xl text-amber-200/50 dark:text-amber-800/30 font-serif">"</div>
              <div class="relative bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/60 dark:border-gray-700/60 p-4 shadow-sm">
                <UiTextarea 
                  readonly 
                  rows="6" 
                  :default-value="contactMessages?.message || 'Tidak ada pesan'"
                  class="resize-none border-0 bg-transparent text-gray-800 dark:text-gray-200 leading-relaxed"
                />
              </div>
              <div class="absolute -bottom-4 -right-2 text-6xl text-amber-200/50 dark:text-amber-800/30 font-serif rotate-180">"</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Footer -->
      <UiDialogFooter class="border-t bg-gray-50/50 dark:bg-gray-900/50 pt-6 gap-3 -mx-6 px-6 mt-6">
        <UiButton 
          variant="outline" 
          @click="$emit('close')" 
          class="flex-1 sm:flex-none hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Tutup
        </UiButton>
        <UiButton 
          as-child 
          class="flex-1 sm:flex-none bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg"
        >
          <a :href="`mailto:${contactMessages?.email}`" class="inline-flex items-center gap-2">
            <Mail class="size-4" />  
            Balas Pesan
          </a>
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>

<script lang="ts" setup>
import { Mail } from 'lucide-vue-next';
import type { ContactMessages } from '~/server/db/schema';

const props = defineProps<{
  isOpen: boolean;
  contactMessages: ContactMessages | null;
}>();

const emit = defineEmits<{
  "update:open": [value: boolean];
  close: [];
  refresh: [];
}>();
</script>