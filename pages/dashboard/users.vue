<template>
  <DashboardHeader
    title="Users"
    description="Halaman ini digunakan untuk mengelola Pengguna/user aplikasi." />

  <DashboardUserTable
    :data="data"
    :columns="columns"
    @openDialog="openDialog"
    @refresh="handleRefresh" />

  <DashboardUserDialog
    :isOpen="dialogState.open"
    :user="dialogState.user"
    @refresh="handleRefresh"
    @close="closeDialog"
    v-model:open="dialogState.open" />
</template>

<script lang="ts" setup>
import { columns } from "~/components/dashboard/user/column";
import type { User } from "~/components/dashboard/user/user.constant";

useHead({
  title: "User",
  meta: [
    {
      name: "description",
      content: "Halaman ini digunakan untuk mengelola Pengguna/user aplikasi.",
    },
  ],
});

const {
  data: fetchData,
  error,
  refresh,
  status,
} = await useAsyncData("users", () => $fetch("/api/users"));

const data = ref<User[]>([]);

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
  user: null as User | null,
});

const openDialog = (user?: User) => {
  dialogState.value.open = true;
  dialogState.value.user = user || null;
};

const closeDialog = () => {
  dialogState.value.open = false;
  dialogState.value.user = null;
};
</script>
