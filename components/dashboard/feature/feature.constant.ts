import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const featureOptions = [
  "Registrasi",
  "Rekam Medis",
  "Berkas Digital",
  "Farmasi",
  "Laboratorium",
  "Radiologi",
  "Integrasi",
  "Antrian",
  "Master",
];

export const featureIcons = [
  "fluent:folder-people-20-regular",
  "material-symbols:docs-rounded",
  "fa6-solid:user-doctor",
  "maki:doctor-11",
  "healthicons:cardiogram-e",
  "tabler:device-mobile",
  "material-symbols:earthquake-rounded",
  "mdi:access-point-network",
  "streamline:database-server-2-solid",
  "material-symbols:database-sharp",
  "material-symbols:notifications-active",
  "solar:calendar-linear",
  "icon-park-solid:medicine-bottle",
  "solar:pill-bold",
  "fluent:people-queue-32-filled",
  "medical-icon:i-mri-pet",
  "medical-icon:i-laboratory",
  "material-symbols:list-alt-check-rounded",
];

export const featuresSchema = toTypedSchema(
  z.object({
    title: z
      .string()
      .min(1, "Nama Fitur Harus Diisi")
      .max(255, { message: "nama fitur terlalu panjang" }),
    category: z
      .string()
      .min(1, "Kategori Wajib Diisi")
      .max(255, { message: "kategori fitur terlalu panjang" }),
    icon: z.string().max(100, { message: "Nama Icon Terlalu Panjang, hubungi developer" }).nullable().optional(),
    //   image: z.string().max(255).nullable().optional(),
    excerpt: z.string().min(1, { message:"Field ini wajib diisi" }),
    description: z.string().min(1, { message:"Field ini wajib diisi" }),
    featureList: z.array(
      z.object({
        value: z
          .string()
          .min(1, { message: "Masukkan Penjelasan Untuk menarik pelanggan" }),
      })
    ),
    isActive: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
  })
);
