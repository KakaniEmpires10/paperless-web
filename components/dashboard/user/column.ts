import type { ColumnDef } from "@tanstack/vue-table";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/lib/utils";
import type { User } from "./user.constant";
import DashboardUserAction from "./DashboardUserAction.vue";

export const columns: ColumnDef<User>[] = [
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
              "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-100 text-indigo-600 w-fit",
          },
          row.original.role
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

      return h("center", {}, [
        h("div", {
          class: cn(
            "size-4 rounded-full",
            isActive ? "bg-green-500" : "bg-rose-500"
          ),
        }),
      ]);
    },
  },
  {
    id: "actions",
    header: () => h("center", {}, "Aksi"),
    cell: ({ row }) => h(DashboardUserAction, { row }),
  },
];
