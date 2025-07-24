<template>
  <DashboardHeader
    title="Paket"
    description="Halaman ini digunakan untuk melihat list Paket yang disediakan untuk klien perusahaan untuk ditampilkan di halaman depan" />

  <DashboardPriceFilter :filters="filters" @reset-filters="resetFilters" />
  <DashboardPriceGrid :prices="filteredPrices" @refresh="refresh" />
</template>

<script lang="ts" setup>
import type { PriceFilters } from "~/components/dashboard/price/price.constant";
import type { PricingPlan } from "~/server/db/schema";

useHead({
  title: "Paket - Dashboard",
  meta: [
    {
      name: "description",
      content:
        "Halaman ini digunakan untuk mengelola Paket yang disediakan perusahaan.",
    },
  ],
});

const {
  data: fetchData,
  refresh
} = await useAsyncData("price", () => $fetch("/api/price"));

const prices = ref<PricingPlan[]>([]);

const filters = ref<PriceFilters>({
  search: "",
  type: null, // 'rs' | 'klinik' | null
  status: null, // true | false | null (active/inactive)
});

watch(fetchData, (val) => {
  prices.value = val || []
}, { immediate: true })

const resetFilters = () => {
  filters.value = {
    search: "",
    type: null,
    status: null,
  };
};

// Fixed filter logic
const filteredPrices = computed(() => {
  const search = filters.value.search.toLowerCase();
  const type = filters.value.type;
  const status = filters.value.status;

  return prices.value.filter(price => {
    // Search filter - check name and description
    const matchesSearch = 
      price.name.toLowerCase().includes(search) ||
      price.description?.toLowerCase().includes(search);

    // Type filter - check package type (rs/klinik)
    const matchesType = type === null || price.type === type;

    // Status filter - check if package is active/inactive
    const matchesStatus = status === null || price.isActive === status;

    return matchesSearch && matchesType && matchesStatus;
  });
});
</script>