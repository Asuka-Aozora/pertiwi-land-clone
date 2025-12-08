import { z } from "zod";

/**
 * Schema validasi untuk contact form
 */
const genderOptions = ["Laki-laki", "Perempuan"] as const;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(255, "Nama maksimal 255 karakter"),

  gender: z
    .enum(genderOptions, {
      error: () => ({ message: "Pilih jenis kelamin" }),
    })
    .optional(),

  phone: z
    .string()
    .min(10, "Nomor HP minimal 10 digit")
    .max(15, "Nomor HP maksimal 15 digit")
    .regex(/^[0-9+]+$/, "Nomor HP hanya boleh berisi angka dan +"),

  email: z
    .string()
    .email("Format email tidak valid")
    .max(255, "Email maksimal 255 karakter"),

  domicile: z
    .string()
    .min(2, "Domisili minimal 2 karakter")
    .max(255, "Domisili maksimal 255 karakter")
    .optional(),

  message: z.string().max(1000, "Pesan maksimal 1000 karakter").optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
