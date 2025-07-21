<template>
  <div class="mb-4">
    <h2 class="text-2xl font-bold">{{ props.title }}</h2>
    <p v-if="props.description" class="text-gray-600 mt-2">
      {{ props.description }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string
  description?: string
}>()
</script>