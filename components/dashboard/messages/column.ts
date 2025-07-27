import { DashboardMessagesAction } from "#components";
import type { ColumnDef } from "@tanstack/vue-table";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/lib/utils";
import type { ContactMessages } from "~/server/db/schema";

export const columns: ColumnDef<ContactMessages>[] = [
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
          row.original.position
        ),
        h(
          "span",
          {
            class:
              "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary w-fit",
          },
          formatDate(row.original.createdAt)
        ),
      ]),
  },
  {
    accessorKey: "hospitalName",
    header: () => "Rumah Sakit",
    cell: ({ row }) =>
      h("h3", { class: "font-bold" }, row.getValue("hospitalName")),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "No. Tel",
  },
  {
    accessorKey: "isRead",
    header: () => h("center", {}, "Status"),
    cell: ({ row }) => {
      const isActive = row.original.isRead;
      const statusText = isActive ? "Sudah Dibaca" : "Belum Dibaca";

      return h("center", {}, [
        h(
          "span",
          {
            class: cn(
              "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium w-fit",
              isActive
                ? "bg-green-100 text-green-600"
                : "bg-rose-100 text-rose-500"
            ),
          },
          statusText
        ),
      ]);
    },
  },
  {
    id: "actions",
    header: () => h("center", {}, "Aksi"),
    cell: ({ row }) => h(DashboardMessagesAction, { row }),
  },
];
