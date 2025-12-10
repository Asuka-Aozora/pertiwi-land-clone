import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { projectFormSchema } from "@/lib/validations/project";
import {
  successResponse,
  errorResponse,
  withErrorHandling,
} from "@/lib/api-response";
import { generateSlug, generateUniqueSlug } from "@/lib/slug";

/**
 * GET /api/projects
 * Fetch all projects dengan optional filtering
 *
 * Query params:
 * - status: filter by status (available, coming_soon, sold_out)
 * - featured: filter by is_featured (true/false)
 * - limit: limit results
 */
export const GET = withErrorHandling(async (request: NextRequest) => {

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const featured = searchParams.get("featured");
  const limit = searchParams.get("limit");

  const supabase = await createClient();

  // Build query
  let query = supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  // Apply filters
  if (status) {
    query = query.eq("status", status);
  }

  if (featured === "true") {
    query = query.eq("is_featured", true);
  }

  if (limit) {
    query = query.limit(parseInt(limit));
  }

  const { data, error } = await query;

  if (error) {
    console.error("Database error:", error);
    return errorResponse("Gagal mengambil data projects", 500);
  }

  return successResponse(data);
});

/**
 * POST /api/projects
 * Create new project
 * Requires authentication (admin only)
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

  // Parse request body
  const body = await request.json();

  // Validate input
  const validationResult = projectFormSchema.safeParse(body);

  if (!validationResult.success) {
    const errors = validationResult.error;
    return errorResponse(`Validation error: ${errors}`, 400);
  }

  const validatedData = validationResult.data;

  // Generate slug jika kosong
  let slug = validatedData.slug;
  if (!slug || slug.trim() === "") {
    slug = generateSlug(validatedData.title);
  }

  // Check slug uniqueness
  const { data: existingProjects } = await supabase
    .from("projects")
    .select("slug");

  const existingSlugs = existingProjects?.map((p) => p.slug) || [];

  if (existingSlugs.includes(slug)) {
    slug = generateUniqueSlug(slug, existingSlugs);
  }

  // Insert project
  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        ...validatedData,
        slug,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Database error:", error);

    // Handle duplicate slug error
    if (error.code === "23505") {
      return errorResponse(
        "Slug sudah digunakan. Gunakan slug yang berbeda.",
        400
      );
    }

    return errorResponse("Gagal membuat project", 500);
  }

  return successResponse(data, "Project berhasil dibuat", 201);
});
