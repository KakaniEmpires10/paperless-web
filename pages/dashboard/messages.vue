<template>
  <DashboardHeader
    title="Pesan"
    description="Halaman ini untuk mengelola Pesan yang masuk dari halaman kontak." />

    <DashboardMessagesTable
      :data="data" 
      :columns="columns" 
      @openDialog="openDialog" 
      @refresh="handleRefresh"
    />
    <DashboardMessagesDialog :isOpen="dialogState.open" :contactMessages="dialogState.contactMessages" @close="closeDialog" @refresh="handleRefresh" v-model:open="dialogState.open" />
</template>

<script lang="ts" setup>
import { columns } from '~/components/dashboard/messages/column';
import type { ContactMessages } from '~/server/db/schema';

useHead({
  title: "Pesan Masuk",
  meta: [
    {
      name: "description",
      content: "Halaman ini untuk mengelola Pesan yang masuk dari halaman kontak.",
    },
  ],
});

const {
  data: fetchData,
  error,
  refresh,
  status,
} = await useAsyncData('messages', () => $fetch('/api/contacts'));

const data = ref<ContactMessages[]>([])

const handleRefresh = async () => {
  await refresh();
  data.value = fetchData.value || [];
};

watch(fetchData, (val) => {
  data.value = val || [];
}, { immediate: true });

const dialogState = ref({
  open: false,
  contactMessages: null as ContactMessages | null,
});

const openDialog = (contactMessages?: ContactMessages) => {
  dialogState.value.open = true;
  dialogState.value.contactMessages = contactMessages || null;
};

const closeDialog = () => {
  dialogState.value.open = false;
  dialogState.value.contactMessages = null;
};
</script>