import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const settingSchema = toTypedSchema(
  z.object({
    // Company Name - Required
    company_name: z
      .string()
      .min(1, { message: "Nama perusahaan wajib diisi" })
      .min(2, { message: "Nama perusahaan minimal 2 karakter" })
      .max(255, { message: "Nama perusahaan maksimal 255 karakter" }),

    // Company Abbreviation - Optional
    company_abbr: z
      .string()
      .max(50, { message: "Singkatan perusahaan maksimal 50 karakter" })
      .optional()
      .or(z.literal("")),

    // About - Optional
    about: z
      .string()
      .min(10, { message: "Deskripsi perusahaan minimal 10 karakter" })
      .max(1000, { message: "Deskripsi perusahaan maksimal 1000 karakter" })
      .optional()
      .or(z.literal("")),

    // Excerpt - Optional
    excerpt: z
      .string()
      .min(10, { message: "Ringkasan minimal 10 karakter" })
      .max(500, { message: "Ringkasan maksimal 500 karakter" })
      .optional()
      .or(z.literal("")),

    // Moto - Optional
    moto: z
      .string()
      .min(5, { message: "Moto minimal 5 karakter" })
      .max(255, { message: "Moto maksimal 255 karakter" })
      .optional()
      .or(z.literal("")),

    // Keywords - Required array
    keywords: z
      .array(z.string().min(1, { message: "Keyword tidak boleh kosong" }))
      .min(1, { message: "Minimal satu keyword harus diisi" })
      .refine(
        keywords => {
          // Check untuk duplicate keywords
          const uniqueKeywords = new Set(
            keywords.map(k => k.toLowerCase().trim())
          );
          return uniqueKeywords.size === keywords.length;
        },
        { message: "Keyword tidak boleh duplikat" }
      ),

    // Vision - Required array of objects with value as string
    vision: z
      .array(
        z.object({
          value: z
            .string()
            .min(1, { message: "Point visi tidak boleh kosong" })
            .min(5, { message: "Setiap point visi minimal 5 karakter" })
            .max(200, { message: "Setiap point visi maksimal 200 karakter" }),
        })
      )
      .min(1, { message: "Minimal satu point visi harus diisi" })
      .max(10, { message: "Maksimal 10 point visi" })
      .refine(
        visions => {
          // Check untuk duplicate visions
          const uniqueVisions = new Set(
            visions.map(v => v.value.toLowerCase().trim())
          );
          return uniqueVisions.size === visions.length;
        },
        { message: "Point visi tidak boleh duplikat" }
      ),

    // Mission - Required array of objects with value as string
    mission: z
      .array(
        z.object({
          value: z
            .string()
            .min(1, { message: "Point misi tidak boleh kosong" })
            .min(5, { message: "Setiap point misi minimal 5 karakter" })
            .max(200, { message: "Setiap point misi maksimal 200 karakter" }),
        })
      )
      .min(1, { message: "Minimal satu point misi harus diisi" })
      .max(10, { message: "Maksimal 10 point misi" })
      .refine(
        missions => {
          // Check untuk duplicate missions
          const uniqueMissions = new Set(
            missions.map(m => m.value.toLowerCase().trim())
          );
          return uniqueMissions.size === missions.length;
        },
        { message: "Point misi tidak boleh duplikat" }
      ),

    // Email - Required
    email: z
      .string()
      .min(1, { message: "Email wajib diisi" })
      .max(255, { message: "Email maksimal 255 karakter" })
      .email({ message: "Format email tidak valid" }),

    // Address - Optional
    address: z
      .string()
      .min(10, { message: "Alamat minimal 10 karakter" })
      .max(500, { message: "Alamat maksimal 500 karakter" })
      .optional()
      .or(z.literal("")),

    // Phone Number - Optional
    phone_number: z
      .string()
      .max(20, { message: "Nomor telepon maksimal 20 karakter" })
      .refine(
        phone => {
          if (!phone || phone === "") return true;
          // Simple phone validation (bisa disesuaikan dengan format Indonesia)
          const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,20}$/;
          return phoneRegex.test(phone);
        },
        { message: "Format nomor telepon tidak valid" }
      )
      .optional()
      .or(z.literal("")),

    // LinkedIn - Optional
    linkedin: z
      .string()
      .max(255, { message: "URL LinkedIn maksimal 255 karakter" })
      .url({ message: "Format URL LinkedIn tidak valid" })
      .optional()
      .or(z.literal("")),

    // Instagram - Optional
    instagram: z
      .string()
      .max(255, { message: "URL Instagram maksimal 255 karakter" })
      .url({ message: "Format URL Instagram tidak valid" })
      .optional()
      .or(z.literal("")),

    // Twitter - Optional
    twitter: z
      .string()
      .max(255, { message: "URL Twitter maksimal 255 karakter" })
      .url({ message: "Format URL Twitter tidak valid" })
      .optional()
      .or(z.literal("")),

    // Youtube - Optional
    youtube: z
      .string()
      .max(255, { message: "URL Youtube maksimal 255 karakter" })
      .url({ message: "Format URL Youtube tidak valid" })
      .optional()
      .or(z.literal("")),
  })
);
