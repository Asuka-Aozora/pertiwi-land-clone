import { z } from "zod";

/**
 * Status options for projects - matches database CHECK constraint
 */
const projectStatusOptions = ["available", "ongoing"] as const;

/**
 * Schema for gallery image input (for CREATE/UPDATE)
 */
export const galleryInputSchema = z.object({
  image_url: z.string().url("URL gambar tidak valid"),
});

/**
 * Schema for feature input
 */
export const featureInputSchema = z.object({
  name: z.string().min(1, "Nama fitur harus diisi"),
  image_url: z.string().url("URL gambar tidak valid").optional().nullable(),
});

/**
 * Schema for surrounding/nearby places input
 */
export const surroundingInputSchema = z.object({
  name: z.string().min(1, "Nama lokasi harus diisi"),
  image_url: z.string().url("URL gambar tidak valid").optional().nullable(),
  distance_km: z
    .number()
    .positive("Jarak harus lebih dari 0")
    .optional()
    .nullable(),
  distance_minutes: z
    .number()
    .int("Waktu tempuh harus bilangan bulat")
    .positive("Waktu harus lebih dari 0")
    .optional()
    .nullable(),
});

/**
 * Schema for house type input
 */
export const houseTypeInputSchema = z.object({
  name: z.string().min(1, "Nama tipe rumah harus diisi"),
  image_url: z.string().url("URL gambar tidak valid").optional().nullable(),
});

/**
 * Schema for facility input
 */
export const facilityInputSchema = z.object({
  name: z.string().min(1, "Nama fasilitas harus diisi"),
  image_url: z.string().url("URL gambar tidak valid").optional().nullable(),
});

/**
 * Main project form schema - matches actual database columns
 */
export const projectFormSchema = z.object({
  // Required fields
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .max(255, "Slug maksimal 255 karakter")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan dash")
    .refine((slug) => !slug.startsWith("-") && !slug.endsWith("-"), {
      message: "Slug tidak boleh diawali atau diakhiri dengan dash",
    }),

  name: z
    .string()
    .min(3, "Nama project minimal 3 karakter")
    .max(255, "Nama project maksimal 255 karakter"),

  status: z.enum(projectStatusOptions, {
    error: "Status harus 'available' atau 'ongoing'",
  }),

  // Optional text fields
  price_range: z
    .string()
    .max(255, "Range harga maksimal 255 karakter")
    .optional()
    .nullable(),

  price: z
    .string()
    .max(255, "Harga maksimal 255 karakter")
    .optional()
    .nullable(),

  location: z
    .string()
    .max(255, "Lokasi maksimal 255 karakter")
    .optional()
    .nullable(),

  full_address: z
    .string()
    .max(1000, "Alamat lengkap maksimal 1000 karakter")
    .optional()
    .nullable(),

  description: z
    .string()
    .max(5000, "Deskripsi maksimal 5000 karakter")
    .optional()
    .nullable(),

  main_image: z
    .string()
    .url("URL gambar utama tidak valid")
    .optional()
    .nullable(),

  site_plan: z.string().url("URL site plan tidak valid").optional().nullable(),

  land_size: z
    .string()
    .max(100, "Luas tanah maksimal 100 karakter")
    .optional()
    .nullable(),

  building_size: z
    .string()
    .max(100, "Luas bangunan maksimal 100 karakter")
    .optional()
    .nullable(),

  floor_count: z
    .string()
    .max(50, "Jumlah lantai maksimal 50 karakter")
    .optional()
    .nullable(),

  // Boolean and ordering
  is_featured: z.boolean().default(false),

  featured_order: z
    .number()
    .int("Urutan featured harus bilangan bulat")
    .min(0, "Urutan tidak boleh negatif")
    .optional()
    .nullable(),

  display_order: z
    .number()
    .int("Urutan tampilan harus bilangan bulat")
    .min(0, "Urutan tidak boleh negatif")
    .optional()
    .nullable(),
});

/**
 * Full project input schema including child relations
 */
export const projectCreateSchema = projectFormSchema.extend({
  galleries: z.array(galleryInputSchema).default([]),
  features: z.array(featureInputSchema).default([]),
  surroundings: z.array(surroundingInputSchema).default([]),
  house_types: z.array(houseTypeInputSchema).default([]),
  facilities: z.array(facilityInputSchema).default([]),
});

/**
 * Partial schema for updates - all fields optional
 */
export const projectUpdateSchema = projectFormSchema.partial().extend({
  galleries: z.array(galleryInputSchema).optional(),
  features: z.array(featureInputSchema).optional(),
  surroundings: z.array(surroundingInputSchema).optional(),
  house_types: z.array(houseTypeInputSchema).optional(),
  facilities: z.array(facilityInputSchema).optional(),
});

// Type exports
export type ProjectFormValues = z.infer<typeof projectFormSchema>;
export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
export type GalleryInput = z.infer<typeof galleryInputSchema>;
export type FeatureInput = z.infer<typeof featureInputSchema>;
export type SurroundingInput = z.infer<typeof surroundingInputSchema>;
export type HouseTypeInput = z.infer<typeof houseTypeInputSchema>;
export type FacilityInput = z.infer<typeof facilityInputSchema>;
