<template>
  <UiCard class="p-4 flex-row justify-between items-center">
    <div class="flex gap-4 items-end">
      <!-- Search -->
      <div class="relative">
        <UiInput
          ref="inputRef"
          :model-value="
            (table.getColumn('name')?.getFilterValue() as string) ?? ''
          "
          class="peer ps-9"
          placeholder="Cari Nama..."
          @input="
            table.getColumn('name')?.setFilterValue($event.target.value)
          " />
        <div
          class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon name="material-symbols:group-search" />
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-2 justify-end">
      <UiButton variant="outline"
        ><Icon name="material-symbols-light:filter-alt-off" class="text-base" />
        Reset</UiButton
      >
      <UiButton @click="$emit('openDialog')" class="w-full"
        ><Icon name="material-symbols:person-add-rounded" class="text-base" />
        Tambah Klien</UiButton
      >
    </div>
  </UiCard>
</template>

<script lang="ts" setup>
import { type Table } from "@tanstack/vue-table";
import type { Client } from "./client.constant";

defineProps<{
  table: Table<Client>;
}>();

defineEmits<{
  openDialog: (client?: Client) => void;
}>();
</script>
