<template>
  <div class="flex gap-1 justify-center">
    <UiTooltipProvider :delay-duration="0">
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton size="icon-sm" @click="handleEdit"
            ><PencilLine class="size-3"
          /></UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent class="px-2 text-xs" :show-arrow="true">
          Edit
        </UiTooltipContent>
      </UiTooltip>
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton variant="destructive" size="icon-sm" @click="handleDelete"
            ><Trash2 class="size-3"
          /></UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent class="px-2 text-xs" :show-arrow="true">
          Hapus
        </UiTooltipContent>
      </UiTooltip>
    </UiTooltipProvider>
  </div>
</template>

<script lang="ts" setup>
import type { Row } from "@tanstack/vue-table";
import { PencilLine, Trash2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { User } from "./user.constant";

const props = defineProps<{ row: Row<User> }>();

const storeDelete = useDeleteDialogStore();

// Inject the event handlers from the table component
const tableEvents = inject<{
  refresh: () => void;
  openDialog: (user?: User) => void;
}>('tableUserEvents');

const handleEdit = () => {
  tableEvents?.openDialog(props.row.original);
};

const handleDelete = () => {
  storeDelete.openDialog({
    id: props.row.original.id,
    name: props.row.original.name,
    endpoint: "/api/users",
    title: "Apakah Anda yakin?",
    description: `Aksi ini tidak dapat dibatalkan. Anda akan menghapus user "${props.row.original.name}" secara permanen.`,
    onSuccess: async () => {
      toast.success("User berhasil dihapus.");
      tableEvents?.refresh();
    },
    onError: error => {
      toast.error("Gagal menghapus user.");
      console.error("Delete error:", (error as Error).message);
    },
  });
};
</script>