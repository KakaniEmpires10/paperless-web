<template>
  <DashboardUserFilter @openDialog="$emit('openDialog')" :table="table" />
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
                  class="w-8 h-8 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="space-y-2">
                <h3 class="text-lg font-semibold text-muted-foreground">
                  user tidak ditemukan
                </h3>
                <p class="text-sm text-muted-foreground">
                  Ayo semangat tambah user biar banyak list disini
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
import type { User } from "./user.constant";

interface DataTableProps {
  columns: ColumnDef<User, any>[];
  data: User[];
}

const props = defineProps<DataTableProps>();
const emit = defineEmits<{
  openDialog: [user?: User];
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
provide('tableUserEvents', {
  refresh: () => emit('refresh'),
  openDialog: (user?: User) => emit('openDialog', user)
});
</script>