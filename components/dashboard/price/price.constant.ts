import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export interface PriceFilters {
  search: string;
  type: "rs" | "klinik" | null;
  status: boolean | null;
}

export const pricingSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(1, "Nama paket harus diisi")
      .max(255, "Nama paket maksimal 255 karakter"),

    excerpt: z.string().min(1, "Deskripsi singkat wajib diisi"),
    description: z.string().optional(),

    type: z
      .string()
      .min(1, "Tipe paket harus diisi"),

    features: z.array(
      z.object({
        value: z.string().min(1, { message: "Masukkan Penjelasan Untuk menarik pelanggan" }),
      }),
    )
    .optional(),

    price: z
      .coerce.number({ invalid_type_error: "Harga Harus Diisi" })
      .min(1, "Harga Harus Lebih Dari 0"),

    isPopular: z.boolean().default(false),

    order: z.coerce.number().default(0),

    isActive: z.boolean().default(true),
  })
);
