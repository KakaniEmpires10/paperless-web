<template>
  <DashboardHeader
    title="Fitur"
    description="Halaman ini digunakan untuk melihat list Fitur yang disediakan untuk klien perusahaan untuk ditampilkan di halaman depan" />

  <DashboardFeatureFilter />
  <DashboardFeatureGrid :features="features" @refresh="refresh" />
</template>

<script lang="ts" setup>
import type { Feature } from "~/server/db/schema";

useHead({
  title: "Fitur - Dashboard",
  meta: [
    {
      name: "description",
      content:
        "Halaman ini digunakan untuk mengelola List Fitur yang disediakan perusahaan.",
    },
  ],
});

const { data: fetchData, refresh } = await useAsyncData("fetures", () =>
  $fetch("/api/features")
);

const features = ref<Feature[]>([]);

watch(
  fetchData,
  val => {
    features.value = val || [];
  },
  { immediate: true }
);
</script>
