<script setup lang="ts">
const value = defineModel<string>()
</script>

<template>
  <div class="bg-background inline-flex h-10 rounded-lg p-1 shadow shadow-primary">
    <UiRadioGroup
      v-model="value"
      class="group relative inline-grid grid-cols-[1fr_1fr] items-center gap-0.5 text-sm font-medium after:absolute after:inset-y-1 after:w-[calc(50%-0.125rem)] after:rounded-md after:bg-primary/10 after:backdrop-blur-sm after:border after:border-primary/20 after:shadow-sm after:transition-all after:duration-300 after:ease-out has-focus-visible:after:ring-2 has-focus-visible:after:ring-primary/30 data-[state=rs]:after:translate-x-0 data-[state=klinik]:after:translate-x-[calc(100%+0.125rem)]"
      :data-state="value">
      <label
        class="relative z-10 inline-flex h-full min-w-0 cursor-pointer items-center justify-center px-5 whitespace-nowrap transition-all duration-300 select-none group-data-[state=rs]:text-primary group-data-[state=klinik]:text-muted-foreground/70 hover:text-primary/80 rounded-md">
        <svg class="w-4 h-4 mr-2 transition-transform duration-300 group-data-[state=rs]:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
        Rumah Sakit
        <UiRadioGroupItem id="rs" value="rs" class="sr-only" />
      </label>
      <label
        class="relative z-10 inline-flex h-full min-w-0 cursor-pointer items-center justify-center px-5 whitespace-nowrap transition-all duration-300 select-none group-data-[state=klinik]:text-primary group-data-[state=rs]:text-muted-foreground/70 hover:text-primary/80 rounded-md">
        <svg class="w-4 h-4 mr-2 transition-transform duration-300 group-data-[state=klinik]:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
        Klinik
        <UiRadioGroupItem id="klinik" value="klinik" class="sr-only" />
      </label>
    </UiRadioGroup>
  </div>
</template>