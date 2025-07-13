<script setup lang="ts">
const { session } = useUserSession()
</script>

<template>
  <div class="grid auto-rows-min gap-4 md:grid-cols-3">
    <div class="bg-muted aspect-video rounded-xl" />
    <div class="bg-muted aspect-video rounded-xl" />
    <div class="bg-muted aspect-video rounded-xl" />
  </div>
  <UiCard class="p-4">
    <pre>
      {{ session }}
    </pre>
  </UiCard>
  <div class="bg-muted min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
</template>