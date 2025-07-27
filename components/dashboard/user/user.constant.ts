import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { type User as UserSchema } from "~/server/db/schema";

export type User = Omit<UserSchema, "lastLoginAt" | "password"> & {
  lastLoginAt: string | null;
};

const roleOption = ["client", "dev", "admin", "superadmin"] as const

export function getInitialValues(user: User | null) {
  return {
    name: user?.name ?? "",
    email: user?.email ?? "",
    role: user?.role ?? "",
    isActive: user?.isActive ?? true,
  };
}

export const userCreateSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(1, "Nama harus diisi")
      .max(255, "Nama maksimal 255 karakter"),

    email: z
      .string()
      .min(1, "Email Wajib Diisi untuk login")
      .email("Email tidak valid")
      .max(255, "Email maksimal 255 karakter"),

    password: z
      .string()
      .min(1, "Password Wajib Diisi untuk login")
      .min(8, "Password Tidak Boleh Kurang dari 8 Karakter")
      .regex(/^(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password Harus Setidaknya Memiliki Satu Huruf Kapital dan Satu Angka",
      }),

    role: z.enum(roleOption, {
      required_error: "Role wajib dipilih",
      invalid_type_error: "Role tidak valid",
    }),

    isActive: z.boolean().default(true),
  })
);
export const userUpdateSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(1, "Nama harus diisi")
      .max(255, "Nama maksimal 255 karakter"),

    email: z
      .string()
      .min(1, "Email Wajib Diisi untuk login")
      .email("Email tidak valid")
      .max(255, "Email maksimal 255 karakter"),

    role: z.enum(roleOption, {
      required_error: "Role wajib dipilih",
      invalid_type_error: "Role tidak valid",
    }),

    isActive: z.boolean().default(true),
  })
);