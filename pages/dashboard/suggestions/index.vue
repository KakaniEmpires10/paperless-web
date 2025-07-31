<template>
  <DashboardHeader
    title="Saran"
    description="Halaman ini digunakan untuk mengirim saran atau laporan bug pada aplikasi agar bisa segera diperbaiki dan terdokumentasi dengan baik" />

  <UiAlert variant="warning">
    <AlertCircle class="h-4 w-4" />
    <UiAlertTitle>Fitur dalam pengembangan</UiAlertTitle>
    <UiAlertDescription>
      Fitur ini akan segera tersedia, untuk sekarang fitur ini masih dalam
      process pembuatan dan pengujian
    </UiAlertDescription>
  </UiAlert>
</template>

<script lang="ts" setup>
import { AlertCircle } from "lucide-vue-next";

useHead({
  title: "Saran",
  meta: [
    {
      name: "description",
      content:
        "Halaman ini digunakan untuk melaporkan bug dan saran terhadap aplikasi ini untuk dibaca oleh developer.",
    },
  ],
});
</script>
