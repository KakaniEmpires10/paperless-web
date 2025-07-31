<template>
  <DashboardHeader
    title="Permintaan Paket"
    description="Halaman ini digunakan untuk melihat list potensial client yang ingin untuk memesan jasa perusahaan" />

  <TabsPricingDashboard />
  <DashboardDemandsTable
    :data="data"
    :columns="columns"
    @openDialog="openDialog"
    @refresh="handleRefresh" />
  <DashboardDemandsDialog
    :isOpen="dialogState.open"
    :demands="dialogState.demands"
    @close="closeDialog"
    @refresh="handleRefresh"
    v-model:open="dialogState.open" />
</template>

<script lang="ts" setup>
import { columns } from "~/components/dashboard/demands/column";
import type { Demands } from "~/components/dashboard/demands/demands.constant";

useHead({
  title: "Permintaan Paket",
  meta: [
    {
      name: "description",
      content:
        "Halaman ini digunakan untuk melihat permintaan Paket yang disediakan perusahaan.",
    },
  ],
});

const {
  data: fetchData,
  error,
  refresh,
  status,
} = await useAsyncData("demands", () => $fetch("/api/price/demand"));

const data = ref<Demands[]>([]);

const handleRefresh = async () => {
  await refresh();
  data.value = fetchData.value || [];
};

watch(
  fetchData,
  val => {
    data.value = val || [];
  },
  { immediate: true }
);

const dialogState = ref({
  open: false,
  demands: null as Demands | null,
});

const openDialog = (demands?: Demands) => {
  dialogState.value.open = true;
  dialogState.value.demands = demands || null;
};

const closeDialog = () => {
  dialogState.value.open = false;
  dialogState.value.demands = null;
};
</script>
