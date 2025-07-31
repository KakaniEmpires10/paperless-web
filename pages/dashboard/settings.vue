<template>
  <DashboardHeader
    title="Pengaturan"
    description="Halaman ini digunakan untuk mengelola pengaturan dan konfigurasi aplikasi
      web, seperti informasi dasar, preferensi pengguna, serta opsi lainnya yang
      berkaitan dengan sistem." />
  <DashboardSettingForm />
</template>

<script lang="ts" setup>
useHead({
  title: "Setting",
  meta: [
    {
      name: "description",
      content: "Halaman ini digunakan untuk mengelola Detail tampilan dan Data yang ditampilkan oleh web ini.",
    },
  ],
});
</script>
