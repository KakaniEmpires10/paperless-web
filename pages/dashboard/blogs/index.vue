<template>
  <DashboardHeader
    title="Blog"
    description="Halaman ini digunakan untuk melihat list blog yang telah dibuat." />

  <UiAlert variant="warning">
    <AlertCircle class="h-4 w-4" />
    <UiAlertTitle>Fitur dalam pengembangan</UiAlertTitle>
    <UiAlertDescription>
      Fitur ini akan segera tersedia, untuk sekarang fitur ini masih dalam process pembuatan dan pengujian
    </UiAlertDescription>
  </UiAlert>
</template>

<script lang="ts" setup>
import { AlertCircle } from "lucide-vue-next";

useHead({
  title: "Blog - Dashboard",
  meta: [
    {
      name: "description",
      content:
        "Halaman ini digunakan untuk melihat list blog yang telah dibuat.",
    },
  ],
});
</script>