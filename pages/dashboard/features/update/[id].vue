<template>
  <DashboardHeader
    title="Update Fitur"
    description="Halaman ini digunakan untuk memperbaharui Fitur yang disediakan untuk klien perusahaan untuk ditampilkan di halaman depan" />

  <div v-if="pending">Loading...</div>
  <div v-else-if="!data">Data tidak ditemukan</div>
  <DashboardFeatureForm v-else :feature="data" />
</template>

<script lang="ts" setup>
useHead({
  title: "Update Fitur",
  meta: [
    {
      name: "description",
      content:
        "Halaman ini digunakan untuk memperbaharui Fitur yang disediakan perusahaan.",
    },
  ],
});

const route = useRoute();

const { data, pending } = await useLazyFetch(
  `/api/features/${route.params.id}`
);
</script>
