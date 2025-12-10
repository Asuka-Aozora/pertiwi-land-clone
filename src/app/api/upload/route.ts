import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  successResponse,
  errorResponse,
  withErrorHandling,
} from "@/lib/api-response";

/**
 * POST /api/upload
 * Upload image ke Supabase Storage
 * Requires authentication
 *
 * Accepts multipart/form-data dengan field:
 * - file: Image file
 * - bucket: Storage bucket name (default: 'project-images')
 * - folder: Optional subfolder
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return errorResponse("Unauthorized. Please login.", 401);
  }

  // Parse form data
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const bucket = (formData.get("bucket") as string) || "project-images";
  const folder = formData.get("folder") as string | null;

  // Validate file
  if (!file) {
    return errorResponse("File tidak ditemukan", 400);
  }

  // Validate file type
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!validTypes.includes(file.type)) {
    return errorResponse(
      "Tipe file tidak valid. Hanya JPG, PNG, dan WebP yang diizinkan.",
      400
    );
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return errorResponse("Ukuran file terlalu besar. Maksimal 5MB.", 400);
  }

  // Generate unique filename
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(7)}.${fileExt}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    return errorResponse("Gagal mengupload gambar", 500);
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return successResponse(
    {
      url: publicUrl,
      path: data.path,
    },
    "Gambar berhasil diupload",
    201
  );
});

/**
 * DELETE /api/upload
 * Delete image dari Supabase Storage
 * Requires authentication
 *
 * Body:
 * - url: Public URL of image to delete
 * - bucket: Storage bucket name (default: 'project-images')
 */
export const DELETE = withErrorHandling(async (request: NextRequest) => {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return errorResponse("Unauthorized. Please login.", 401);
  }

  const body = await request.json();
  const { url, bucket = "project-images" } = body;

  if (!url) {
    return errorResponse("URL tidak ditemukan", 400);
  }

  // Extract path dari URL
  const urlParts = url.split(`/${bucket}/`);
  if (urlParts.length < 2) {
    return errorResponse("Format URL tidak valid", 400);
  }

  const filePath = urlParts[1];

  // Delete dari Storage
  const { error } = await supabase.storage.from(bucket).remove([filePath]);

  if (error) {
    console.error("Delete error:", error);
    return errorResponse("Gagal menghapus gambar", 500);
  }

  return successResponse(null, "Gambar berhasil dihapus");
});
