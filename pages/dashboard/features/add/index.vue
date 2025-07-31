<template>
  <DashboardHeader
    title="Tambah Fitur"
    description="Halaman ini digunakan untuk menambah Fitur yang disediakan untuk klien perusahaan untuk ditampilkan di halaman depan" />

    <DashboardFeatureForm />
</template>

<script lang="ts" setup>
useHead({
  title: "Tambah Fitur",
  meta: [
    {
      name: "description",
      content:
        "Halaman ini digunakan untuk menambah Fitur yang disediakan perusahaan.",
    },
  ],
});
</script>