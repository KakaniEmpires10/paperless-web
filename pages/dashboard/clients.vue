<template>
  <DashboardHeader
    title="Klien"
    description="Halaman ini digunakan untuk menambah dan mengurangi klien perusahaan untuk ditampilkan di halaman depan" />
    <DashboardClientTable 
      :data="data" 
      :columns="columns" 
      @openDialog="openDialog" 
      @refresh="handleRefresh" 
    />
    <DashboardClientDialog :isOpen="dialogState.open" :client="dialogState.client" @refresh="handleRefresh" @close="closeDialog" v-model:open="dialogState.open" />
</template>

<script lang="ts" setup>
import type { Client } from '~/components/dashboard/client/client.constant';
import { columns } from '~/components/dashboard/client/column';

useHead({
  title: "klien",
  meta: [
    {
      name: "description",
      content: "Halaman ini digunakan untuk mengelola Klien perusahaan Anda.",
    },
  ],
})

const {
  data: fetchData,
  error,
  refresh,
  status,
} = await useAsyncData('client', () => $fetch('/api/clients'));

const data = ref<Client[]>([])

const handleRefresh = async () => {
  await refresh();
  data.value = fetchData.value || [];
};

watch(fetchData, (val) => {
  data.value = val || [];
}, { immediate: true });

const dialogState = ref({
  open: false,
  client: null as Client | null,
});

const openDialog = (client?: Client) => {
  dialogState.value.open = true;
  dialogState.value.client = client || null;
};

const closeDialog = () => {
  dialogState.value.open = false;
  dialogState.value.client = null;
};
</script>