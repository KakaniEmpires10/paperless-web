<template>
  <DashboardHeader
    title="Tambah Paket"
    description="Halaman ini digunakan untuk menambah Paket yang disediakan untuk klien perusahaan untuk ditampilkan di halaman depan" />

    <DashboardPriceForm />
</template>

<script setup lang="ts">
useHead({
  title: "Tambah Paket",
  meta: [
    {
      name: "description",
      content:
        "Halaman ini digunakan untuk Menambah Paket yang disediakan perusahaan.",
    },
  ],
})
</script>