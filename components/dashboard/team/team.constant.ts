import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import type { Team } from "~/server/db/schema";

export const roleOptions = [
  { label: "CEO", value: "CEO" },
  { label: "CTO", value: "CTO" },
  { label: "CFO", value: "CFO" },
  { label: "CMO", value: "CMO" },
  { label: "COO", value: "COO" },
  { label: "HR", value: "HR" },
  { label: "Marketing", value: "Marketing" },
  { label: "Back-end", value: "Back-end" },
  { label: "Front-end", value: "Front-end" },
  { label: "Designer", value: "Designer" },
  { label: "QA", value: "QA" },
  { label: "DevOps", value: "DevOps" },
  { label: "Full-stack", value: "Full-stack" },
];

export function getInitialValues(team: Team | null) {
  return {
    name: team?.name ?? "",
    position: team?.position ?? "",
    email: team?.email ?? "",
    phone: team?.phone ?? "",
    bio: team?.bio ?? "",
    linkedin: team?.linkedin ?? "",
    instagram: team?.instagram ?? "",
    twitter: team?.twitter ?? "",
    isActive: team?.isActive ?? true,
  };
}

export type TeamFilters = {
  search: string;
  role: string[];
  status: boolean | null; // null means "All"
};

export const teamSchema = toTypedSchema(
  z.object({
    name: z
      .string({ required_error: "Nama wajib diisi" })
      .min(1, { message: "Nama wajib diisi" }),
    position: z
      .string({ required_error: "Posisi wajib diisi" })
      .min(1, { message: "Posisi wajib diisi" }),
    bio: z.string().optional().or(z.literal("")),
    email: z
      .string()
      .email({ message: "Email tidak valid" })
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .max(20, { message: "Nomor telepon maksimal 20 karakter" })
      .optional()
      .or(z.literal("")),
    linkedin: z
      .string()
      .url({ message: "URL LinkedIn tidak valid" })
      .optional()
      .or(z.literal("")),
    instagram: z
      .string()
      .url({ message: "URL Instagram tidak valid" })
      .optional()
      .or(z.literal("")),
    twitter: z
      .string()
      .url({ message: "URL Twitter tidak valid" })
      .optional()
      .or(z.literal("")),
    isActive: z.boolean().default(true),
  })
);