import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import type { Client as ClientSchema, PricingPlan } from "~/server/db/schema";

export type Client = ClientSchema & {
  pricing: Pick<PricingPlan, "name">;
};

export function getInitialValues(client: Client | null) {
  return {
    name: client?.name ?? "",
    email: client?.email ?? "",
    phone: client?.phone ?? "",
    pricingPlanId: client?.pricingPlanId ?? "",
    address: client?.address ?? "",
    isActive: client?.isActive ?? true,
  };
}

export const clientSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(1, "Nama harus diisi")
      .max(255, "Nama maksimal 255 karakter"),

    email: z
      .string()
      .email("Email tidak valid")
      .max(255, "Email maksimal 255 karakter")
      .optional()
      .or(z.literal("")),

    phone: z
      .string()
      .max(20, "Nomor telepon maksimal 20 karakter")
      .optional(),

    address: z
      .string()
      .max(1000, "Alamat terlalu panjang")
      .optional(),

    pricingPlanId: z
      .string({ required_error: "Paket harga wajib dipilih" })
      .min(1, "Paket harga wajib dipilih"),

    isActive: z.boolean().default(true),
  })
);
