<template>
  <div class="flex gap-1 justify-center">
    <UiTooltipProvider :delay-duration="0">
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton size="icon-sm" @click="handleView"
            ><Eye class="size-3"
          /></UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent class="px-2 text-xs" :show-arrow="true">
          View
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
import type { Row } from '@tanstack/vue-table';
import { Eye, Trash2 } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import type { Demands } from './demands.constant';

const props = defineProps<{ row: Row<Demands> }>();

const storeDelete = useDeleteDialogStore();

// Inject the event handlers from the table component
const tableEvents = inject<{
  refresh: () => void;
  openDialog: (demands?: Demands) => void;
}>('tableDemandEvents');

const handleView = async () => {
  tableEvents?.openDialog(props.row.original);
};

const handleDelete = () => {
  storeDelete.openDialog({
    id: props.row.original.id,
    name: props.row.original.instanceName,
    endpoint: "/api/price/demand",
    title: "Apakah Anda yakin?",
    description: `Aksi ini tidak dapat dibatalkan. Anda akan menghapus pemesan dari "${props.row.original.instanceName}" secara permanen.`,
    onSuccess: async () => {
      toast.success("Pemesan Paket berhasil dihapus.");
      tableEvents?.refresh();
    },
    onError: error => {
      toast.error("Gagal Menghapus Pemesan Paket.");
      console.error("Delete error:", (error as Error).message);
    },
  });
};
</script>