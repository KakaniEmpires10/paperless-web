<template>
  <DashboardHeader
    title="Update Paket"
    description="Halaman ini digunakan untuk memperbaharui Paket yang disediakan untuk klien perusahaan untuk ditampilkan di halaman depan" />

  <div v-if="pending">Loading...</div>
  <div v-else-if="!data">Data tidak ditemukan</div>
  <DashboardPriceForm v-else :pricing="data" />
</template>

<script lang="ts" setup>
useHead({
  title: "Update Paket - Dashboard",
  meta: [
    {
      name: "description",
      content:
        "Halaman ini digunakan untuk Memperbaharui Paket yang disediakan perusahaan.",
    },
  ],
});

const route = useRoute();

const { data, pending } = await useLazyFetch(`/api/price/${route.params.id}`);
</script>
