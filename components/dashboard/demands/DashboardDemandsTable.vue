<template>
  <UiCard class="p-4">
    <UiTable class="rounded-lg overflow-hidden">
      <UiTableHeader>
        <UiTableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id">
          <UiTableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()" />
          </UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <template v-if="table.getRowModel().rows?.length">
          <UiTableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() && 'selected'"
            @refresh="$emit('refresh')"
            @openDialog="$emit('openDialog', $event)">
            <UiTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()" />
            </UiTableCell>
          </UiTableRow>
        </template>

        <UiTableRow v-else>
          <UiTableCell :colspan="columns.length" class="text-center py-10">
            <div class="space-y-4">
              <div
                class="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-8 text-amber-500"
                  viewBox="0 0 24 24">
                  <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                  <path
                    fill="currentColor"
                    d="M7 17q-.825 0-1.412-.587T5 15V5q0-.825.588-1.412T7 3h14q.825 0 1.413.588T23 5v10q0 .825-.587 1.413T21 17zm6.425-5.1L7 7.425V15h14V7.425L14.575 11.9q-.275.2-.575.2t-.575-.2M14 9.85L21 5H7zM3 21q-.825 0-1.412-.587T1 19V7.5q0-.425.288-.712T2 6.5t.713.288T3 7.5V19h15.5q.425 0 .713.288T19.5 20t-.288.713T18.5 21zM21 7.35V5H7v2.35V5h14z" />
                </svg>
              </div>
              <div class="space-y-2">
                <h3 class="text-lg font-semibold text-muted-foreground">
                  Tidak ada pesanan yang ditemukan
                </h3>
                <p class="text-sm text-muted-foreground">
                  Check lagi dalam beberapa hari, jika ada maka akan ada
                  notifikasi di samping sidebar
                </p>
              </div>
            </div>
          </UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
  </UiCard>
</template>

<script lang="ts" setup>
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useVueTable,
  type ColumnDef,
  type ColumnFiltersState,
} from "@tanstack/vue-table";
import { valueUpdater } from "~/components/ui/table/utils";
import type { Demands } from "./demands.constant";

interface DataTableProps {
  columns: ColumnDef<Demands, any>[];
  data: Demands[];
}

const props = defineProps<DataTableProps>();
const emit = defineEmits<{
  openDialog: [demands?: Demands];
  refresh: [];
}>();

const columnFilters = ref<ColumnFiltersState>([]);
const rowSelection = ref({});

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  state: {
    get columnFilters() {
      return columnFilters.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
  },
  enableRowSelection: true,
  onColumnFiltersChange: updaterOrValue =>
    valueUpdater(updaterOrValue, columnFilters),
  onRowSelectionChange: updaterOrValue =>
    valueUpdater(updaterOrValue, rowSelection),
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
});

// Provide event handlers to child components through provide/inject
provide('tableDemandEvents', {
  refresh: () => emit('refresh'),
  openDialog: (demands?: Demands) => emit('openDialog', demands)
});
</script>
