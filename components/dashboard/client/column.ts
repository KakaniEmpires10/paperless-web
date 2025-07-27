import type { ColumnDef } from "@tanstack/vue-table";
import { Checkbox } from "~/components/ui/checkbox";
import type { Client } from "./client.constant";
import DashboardClientAction from "./DashboardClientAction.vue";

export const columns: ColumnDef<Client>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        modelValue:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate"),
        "onUpdate:modelValue": value =>
          table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
        class: "translate-y-0.5",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": value => row.toggleSelected(!!value),
        ariaLabel: "Select row",
        class: "translate-y-0.5",
      }),
  },
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) =>
      h("div", { class: "flex flex-col gap-1" }, [
        h("h3", {}, row.getValue("name")),
        h(
          "span",
          {
            class:
              "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary w-fit",
          },
          `Sejak: ${formatDate(row.original.createdAt)}`
        ),
      ]),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isActive",
    header: () => h("center", {}, "Status"),
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      const statusClass = isActive ? "bg-green-500" : "bg-rose-500";

      return h("center", {}, [
        h("div", {
          class: `size-4 rounded-full ${statusClass}`,
        }),
      ]);
    },
  },
  {
    accessorKey: "pricing.name",
    header: () => h("center", {}, "Paket"),
    cell: ({ row }) => {
      return h("center", {}, [
        h(
          "span",
          {
            class:
              "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-amber-100 text-amber-600 w-fit",
          },
          row.original.pricing.name
        ),
      ]);
    },
  },
  {
    id: "actions",
    header: () => h("center", {}, "Aksi"),
    cell: ({ row }) =>
      h(DashboardClientAction, {
        row
      }),
  },
];