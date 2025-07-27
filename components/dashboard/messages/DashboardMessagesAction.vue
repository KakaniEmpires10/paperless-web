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
import type { ContactMessages } from '~/server/db/schema';

const props = defineProps<{ row: Row<ContactMessages> }>();

const storeDelete = useDeleteDialogStore();

// Inject the event handlers from the table component
const tableEvents = inject<{
  refresh: () => void;
  openDialog: (contactMessages?: ContactMessages) => void;
}>('tableMessageEvents');

const handleView = async () => {
  tableEvents?.openDialog(props.row.original);

  if (props.row.original.isRead === false) {
    const res = await $fetch(`/api/contacts/${props.row.original.id}`, {
      method: "PATCH",
      body: { isRead: true }
    })
    if (res.message) {
      tableEvents?.refresh();
    }
  }
};

const handleDelete = () => {
  storeDelete.openDialog({
    id: props.row.original.id,
    name: props.row.original.hospitalName,
    endpoint: "/api/contacts",
    title: "Apakah Anda yakin?",
    description: `Aksi ini tidak dapat dibatalkan. Anda akan menghapus pesan dari "${props.row.original.hospitalName}" secara permanen.`,
    onSuccess: async () => {
      toast.success("Pesan berhasil dihapus.");
      tableEvents?.refresh();
    },
    onError: error => {
      toast.error("Gagal menghapus pesan.");
      console.error("Delete error:", (error as Error).message);
    },
  });
};
</script>