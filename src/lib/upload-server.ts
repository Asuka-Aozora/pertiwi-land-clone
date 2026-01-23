import { createClient } from "./supabase/server";

const VALID_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface UploadResult {
  publicUrl: string;
  path: string;
}

/**
 * Generate a unique filename with timestamp and random suffix
 */
function generateFileName(originalName: string): string {
  const ext = originalName.split(".").pop() || "jpg";
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `${timestamp}-${random}.${ext}`;
}

/**
 * Upload a single image to Supabase Storage (server-side)
 * Uses admin client to bypass RLS on storage
 */
export async function uploadImageServer(
  file: File,
  bucket: string = "project-images",
  folder?: string,
): Promise<UploadResult> {
  // Validate file type
  if (!VALID_IMAGE_TYPES.includes(file.type)) {
    throw new Error(
      `Tipe file tidak valid: ${file.type}. Hanya JPG, PNG, dan WebP yang diizinkan.`,
    );
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `Ukuran file terlalu besar: ${(file.size / 1024 / 1024).toFixed(2)}MB. Maksimal 5MB.`,
    );
  }

  const supabase = await createClient();
  const fileName = generateFileName(file.name);
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  // Convert File to ArrayBuffer for server-side upload
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, buffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    throw new Error(`Gagal mengupload gambar: ${error.message}`);
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return {
    publicUrl,
    path: data.path,
  };
}

/**
 * Upload multiple images concurrently
 */
export async function uploadMultipleImagesServer(
  files: File[],
  bucket: string = "project-images",
  folder?: string,
): Promise<UploadResult[]> {
  const uploadPromises = files.map((file) =>
    uploadImageServer(file, bucket, folder),
  );
  return Promise.all(uploadPromises);
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteImageServer(
  publicUrl: string,
  bucket: string = "project-images",
): Promise<void> {
  const supabase = await createClient();

  // Extract path from public URL
  // URL format: https://<project>.supabase.co/storage/v1/object/public/<bucket>/<path>
  const urlParts = publicUrl.split(`/storage/v1/object/public/${bucket}/`);
  if (urlParts.length < 2) {
    throw new Error(`Invalid Storage URL format: ${publicUrl}`);
  }

  const filePath = decodeURIComponent(urlParts[1]);

  const { error } = await supabase.storage.from(bucket).remove([filePath]);

  if (error) {
    console.error("Delete error:", error);
    throw new Error(`Gagal menghapus gambar: ${error.message}`);
  }
}

/**
 * Delete multiple images from Supabase Storage
 */
export async function deleteMultipleImagesServer(
  publicUrls: string[],
  bucket: string = "project-images",
): Promise<void> {
  const deletePromises = publicUrls.map((url) =>
    deleteImageServer(url, bucket),
  );
  await Promise.all(deletePromises);
}

/**
 * Parse FormData and extract files for a given field name
 */
export function extractFilesFromFormData(
  formData: FormData,
  fieldName: string,
): File[] {
  const files: File[] = [];
  const entries = formData.getAll(fieldName);

  for (const entry of entries) {
    if (entry instanceof File && entry.size > 0) {
      files.push(entry);
    }
  }

  return files;
}
