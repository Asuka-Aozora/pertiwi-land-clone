import { createClient } from "./supabase/client";

const supabase = createClient();
const storage = supabase.storage;

export async function uploadImage(
  file: File,
  bucket: string = "project-images",
  folder?: string
): Promise<string> {
  // Validate file type
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!validTypes.includes(file.type)) {
    throw new Error(
      "Tipe file tidak valid. Hanya JPG, PNG, dan WebP yang diizinkan."
    );
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    throw new Error("Ukuran file terlalu besar. Maksimal 5MB.");
  }

  // Generate unique filename dengan timestamp
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(7)}.${fileExt}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  // Upload file ke Supabase Storage
  const { data, error } = await storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    throw new Error("Gagal mengupload gambar");
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = storage.from(bucket).getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Upload multiple images sekaligus
 * @returns Array of public URLs
 */
export async function uploadMultipleImages(
  files: File[],
  bucket: string = "project-images",
  folder?: string
): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadImage(file, bucket, folder));
  return Promise.all(uploadPromises);
}

/**
 * Delete image dari Supabase Storage
 * @param url - Public URL dari image yang akan dihapus
 * @param bucket - Nama bucket storage
 */
export async function deleteImage(
  url: string,
  bucket: string = "project-images"
): Promise<void> {
  try {
    // Extract path dari URL
    const urlParts = url.split(`/${bucket}/`);
    if (urlParts.length < 2) {
      throw new Error("Invalid URL format");
    }

    const filePath = urlParts[1];

    const { error } = await storage.from(bucket).remove([filePath]);

    if (error) throw error;
  } catch (error) {
    console.error("Delete error:", error);
    throw new Error("Gagal menghapus gambar");
  }
}

/**
 * Delete multiple images sekaligus
 */
export async function deleteMultipleImages(
  urls: string[],
  bucket: string = "project-images"
): Promise<void> {
  const deletePromises = urls.map((url) => deleteImage(url, bucket));
  await Promise.all(deletePromises);
}
