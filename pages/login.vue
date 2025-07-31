<template>
  <div class="container mx-auto min-h-dvh flex mt-16 justify-center">
    <AuthLogin />
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Login",
  meta: [
    { name: "description", content: "Halaman Authentikasi aplikasi paperless hospital" }
  ]
})
</script>