import { z } from "zod";

/**
 * Schema validasi untuk form project
 * Menggunakan Zod untuk type-safe validation
 */
const statusOptions = ["available", "coming_soon", "sold_out"] as const;

export const projectFormSchema = z
  .object({
    title: z
      .string()
      .min(3, "Judul minimal 3 karakter")
      .max(255, "Judul maksimal 255 karakter"),

    slug: z
      .string()
      .min(3, "Slug minimal 3 karakter")
      .max(255, "Slug maksimal 255 karakter")
      .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan dash")
      .refine((slug) => !slug.startsWith("-") && !slug.endsWith("-"), {
        message: "Slug tidak boleh diawali atau diakhiri dengan dash",
      }),

    location: z
      .string()
      .min(3, "Lokasi minimal 3 karakter")
      .max(255, "Lokasi maksimal 255 karakter"),

    description: z
      .string()
      .max(5000, "Deskripsi maksimal 5000 karakter")
      .optional(),

    status: z.enum(statusOptions, {
      error: () => ({
        message: "Status harus available, coming_soon, atau sold_out",
      }),
    }),

    price_start: z
      .number()
      .positive("Harga harus lebih dari 0")
      .optional()
      .nullable(),

    price_end: z
      .number()
      .positive("Harga harus lebih dari 0")
      .optional()
      .nullable(),

    land_area: z
      .string()
      .max(100, "Luas tanah maksimal 100 karakter")
      .optional(),

    building_area: z
      .string()
      .max(100, "Luas bangunan maksimal 100 karakter")
      .optional(),

    bedrooms: z
      .number()
      .int("Jumlah kamar harus bilangan bulat")
      .min(0, "Jumlah kamar tidak boleh negatif")
      .max(99, "Jumlah kamar maksimal 99")
      .optional()
      .nullable(),

    bathrooms: z
      .number()
      .int("Jumlah kamar mandi harus bilangan bulat")
      .min(0, "Jumlah kamar mandi tidak boleh negatif")
      .max(99, "Jumlah kamar mandi maksimal 99")
      .optional()
      .nullable(),

    features: z.array(z.string()).default([]),

    amenities: z.array(z.string()).default([]),

    map_embed: z
      .string()
      .max(2000, "Embed map maksimal 2000 karakter")
      .optional(),

    is_featured: z.boolean().default(false),

    display_order: z
      .number()
      .int("Urutan tampilan harus bilangan bulat")
      .min(0, "Urutan tampilan tidak boleh negatif")
      .default(0),
  })
  .refine(
    (data) => {
      // Validasi: price_end harus >= price_start jika keduanya ada
      if (data.price_start && data.price_end) {
        return data.price_end >= data.price_start;
      }
      return true;
    },
    {
      message: "Harga akhir harus lebih besar atau sama dengan harga awal",
      path: ["price_end"],
    }
  );

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
