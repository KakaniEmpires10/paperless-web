<template>
  <div class="flex gap-1 justify-center">
    <UiTooltipProvider :delay-duration="0">
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton size="icon-sm" @click="handleEdit"
            ><PencilLine class="size-3"
          /></UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent class="dark px-2 py-1 text-xs" :show-arrow="true">
          Edit
        </UiTooltipContent>
      </UiTooltip>
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton variant="destructive" size="icon-sm" @click="handleDelete"
            ><Trash2 class="size-3"
          /></UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent class="dark px-2 py-1 text-xs" :show-arrow="true">
          Hapus
        </UiTooltipContent>
      </UiTooltip>
    </UiTooltipProvider>
  </div>
</template>

<script lang="ts" setup>
import type { Row } from "@tanstack/vue-table";
import type { Client } from "./client.constant";
import { PencilLine, Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";

const props = defineProps<{ row: Row<Client> }>();

const storeDelete = useDeleteDialogStore();

// Inject the event handlers from the table component
const tableEvents = inject<{
  refresh: () => void;
  openDialog: (client?: Client) => void;
}>('tableEvents');

const handleEdit = () => {
  tableEvents?.openDialog(props.row.original);
};

const handleDelete = () => {
  storeDelete.openDialog({
    id: props.row.original.id,
    name: props.row.original.name,
    endpoint: "/api/clients",
    title: "Apakah Anda yakin?",
    description: `Aksi ini tidak dapat dibatalkan. Anda akan menghapus klien "${props.row.original.name}" secara permanen.`,
    onSuccess: async () => {
      toast.success("klien berhasil dihapus.");
      tableEvents?.refresh();
    },
    onError: error => {
      toast.error("Gagal menghapus klien.");
      console.error("Delete error:", (error as Error).message);
    },
  });
};
</script>