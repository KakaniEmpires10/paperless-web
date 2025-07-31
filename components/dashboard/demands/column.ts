import type { ColumnDef } from "@tanstack/vue-table";
import { Checkbox } from "~/components/ui/checkbox";
import type { Demands } from "./demands.constant";
import DashboardDemandsAction from "./DashboardDemandsAction.vue";
import { cn } from "~/lib/utils";

export const columns: ColumnDef<Demands>[] = [
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
          formatDate(row.original.createdAt)
        ),
      ]),
  },
  {
    accessorKey: "instanceName",
    header: () => "Instansi",
    cell: ({ row }) =>
      h("h3", { class: "font-bold" }, row.getValue("instanceName")),
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
    accessorKey: "pricing.name",
    header: () => h("center", {}, "Paket"),
    cell: ({ row }) => {
      const pricingPlan = row.original.pricing?.name;
      const type = row.original.pricing?.type
      const text = type == "rs" ? "Rumah Sakit" : "Klinik";

      return h(
        "div",
        { class: "flex flex-col gap-1.5 item-center justify-center w-full" },
        [
          h(
            "span",
            {
              class: cn(
                "inline-flex items-center self-center px-2 py-0.5 rounded-md text-xs font-medium w-fit",
                type === "rs"
                  ? "bg-sky-100 text-sky-500"
                  : "bg-amber-100 text-amber-500"
              ),
            },
            text
          ),
          h(
            "span",
            {
              class:
                "inline-flex items-center self-center px-2 py-0.5 rounded-md text-xs font-medium w-fit bg-indigo-100 text-indigo-500",
            },
            pricingPlan
          ),
        ]
      );
    },
  },
  {
    id: "actions",
    header: () => h("center", {}, "Aksi"),
    cell: ({ row }) => h(DashboardDemandsAction, { row }),
  },
];
