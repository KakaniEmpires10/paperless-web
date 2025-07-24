<template>
  <UiCard class="p-4 flex-row justify-between items-center">
    <div class="flex gap-4 items-end">
      <!-- Search -->
      <div class="relative">
        <UiInput ref="inputRef" class="peer ps-9" placeholder="Cari Nama..." />
        <div
          class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon name="material-symbols:search-rounded" />
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-2 justify-end">
      <UiButton variant="outline"
        ><Icon name="material-symbols-light:filter-alt-off" class="text-base" />
        Reset</UiButton
      >
      <UiButton class="w-full" as-child>
        <NuxtLink to="/dashboard/features/add">
          <Icon name="bxs:layer-plus" class="text-base" />
          Tambah Fitur
        </NuxtLink>
      </UiButton>
    </div>
  </UiCard>
</template>

<script lang="ts" setup></script>
