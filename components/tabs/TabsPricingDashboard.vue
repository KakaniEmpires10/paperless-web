<template>
  <div class="inline-flex h-9 w-fit gap-2 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
    <NuxtLink
      to="/dashboard/prices"
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      :class="isListActive ? 'bg-background text-foreground shadow' : 'hover:bg-background/60 hover:text-foreground'"
    >
      List
    </NuxtLink>
    
    <NuxtLink
      to="/dashboard/prices/demands"
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      :class="isDemandsActive ? 'bg-background text-foreground shadow' : 'hover:bg-background/60 hover:text-foreground'"
    >
      Demands
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const isListActive = computed(() => {
  return route.path === '/dashboard/prices'
})

const isDemandsActive = computed(() => {
  return route.path === '/dashboard/prices/demands'
})
</script>