<template>
  <UiCard class="relative overflow-hidden transition-all duration-300 hover:shadow-lg group border-0 bg-gradient-to-br from-white to-gray-100/50">
    <!-- Popular Badge -->
    <div 
      v-if="pricing.isPopular" 
      class="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg shadow-lg"
    >
      ✨ Populer
    </div>

    <!-- Status Indicator -->
    <div class="absolute top-4 left-4">
      <div 
        :class="[
          'w-3 h-3 rounded-full',
          pricing.isActive ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-gray-400 shadow-gray-400/30',
          'shadow-lg'
        ]"
      ></div>
    </div>

    <UiCardHeader class="pb-4 pt-8">
      <div class="space-y-3">
        <!-- Package Type Badge -->
        <div class="flex items-center gap-2">
          <UiBadge 
            :variant="pricing.type === 'rs' ? 'soft' : 'warning'"
            class="text-xs font-medium"
          >
            <Icon 
              :name="pricing.type === 'rs' ? 'lucide:building-2' : 'lucide:stethoscope'" 
              class="w-3 h-3 mr-1" 
            />
            {{ packageType }}
          </UiBadge>
          <UiBadge 
            :variant="pricing.isActive ? 'default' : 'destructive'"
            class="text-xs"
          >
            {{ pricing.isActive ? 'Aktif' : 'Nonaktif' }}
          </UiBadge>
        </div>

        <!-- Title & Description -->
        <div class="space-y-1">
          <h3 class="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
            {{ pricing.name }}
          </h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            {{ pricing.description }}
          </p>
        </div>

        <!-- Price Display -->
        <div class="py-4">
          <div class="flex items-baseline gap-1">
            <span class="text-sm font-medium text-gray-600">Rp</span>
            <span class="text-3xl font-bold text-gray-900">
              {{ formatPrice(parseFloat(pricing.price)) }}
            </span>
          </div>
          <p class="text-xs text-gray-500 mt-1">Per bulan</p>
        </div>
      </div>
    </UiCardHeader>

    <UiCardContent class="pt-0 space-y-4">
      <!-- Features Section -->
      <div class="space-y-3">
        <UiCollapsible v-model:open="isOpen">
          <UiCollapsibleTrigger as-child>
            <UiButton 
              variant="ghost" 
              size="sm" 
              class="w-full justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span class="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Icon name="lucide:list-checks" class="w-4 h-4" />
                Fitur Paket ({{ pricing.features.length }})
              </span>
              <Icon
                :name="isOpen ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                class="h-4 w-4 transition-transform text-gray-500"
              />
            </UiButton>
          </UiCollapsibleTrigger>

          <UiCollapsibleContent class="mt-2">
            <div class="bg-gray-50/50 rounded-lg p-4 space-y-2">
              <div 
                v-for="(feature, i) in pricing.features" 
                :key="i"
                class="flex items-start gap-2 text-sm"
              >
                <Icon name="lucide:check" class="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">{{ feature }}</span>
              </div>
            </div>
          </UiCollapsibleContent>
        </UiCollapsible>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-2 pt-4 border-t border-gray-100">
        <UiButton 
          variant="outline" 
          size="sm" 
          class="flex-1 hover:bg-primary hover:text-white transition-colors"
          as-child
        >
          <NuxtLink :to="`/dashboard/prices/update/${pricing.id}`">
            <Icon name="lucide:pencil" class="w-4 h-4 mr-2" />
            Edit
          </NuxtLink>
        </UiButton>
        <UiButton 
          variant="destructive" 
          size="sm" 
          class="px-4 hover:bg-red-600 transition-colors"
          @click="handleDelete"
        >
          <Icon name="lucide:trash-2" class="w-4 h-4" />
        </UiButton>
      </div>
    </UiCardContent>

    <!-- Hover Gradient Effect -->
    <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
  </UiCard>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import type { PricingPlan } from "~/server/db/schema";

const props = defineProps<{
  pricing: PricingPlan;
}>();

const emit = defineEmits<{
  refresh: []
}>()

const packageType = computed(() => props.pricing.type == 'rs' ? 'Rumah Sakit' : 'Klinik')

const isOpen = ref(false);

const storeDelete = useDeleteDialogStore();

// Format price with better number formatting
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID').format(price);
};

const handleDelete = () => {
  storeDelete.openDialog({
    id: props.pricing.id,
    name: props.pricing.name,
    endpoint: '/api/price',
    title: 'Apakah Anda yakin?',
    description: `Aksi ini tidak dapat dibatalkan. Anda akan menghapus paket "${props.pricing.name}" secara permanen.`,
    onSuccess: async () => {
      toast.success('Paket berhasil dihapus.')
      emit('refresh')
    },
    onError: (error) => {
      toast.error('Gagal menghapus paket.')
      console.error('Delete error:', (error as Error).message)
    }
  })
}
</script>