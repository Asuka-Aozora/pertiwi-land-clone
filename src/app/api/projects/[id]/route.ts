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
 * GET /api/projects/[id]
 * Fetch single project by ID atau slug
 */
export const GET = withErrorHandling(
  async (request: NextRequest, { params }) => {
    const supabase = await createClient();
    const id = params?.id;

    // Try fetch by ID first, then by slug
    let query = supabase
      .from("projects")
      .select("*")
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    const { data, error } = await query;

    if (error) {
      if (error.code === "PGRST116") {
        return errorResponse("Project tidak ditemukan", 404);
      }
      console.error("Database error:", error);
      return errorResponse("Gagal mengambil data project", 500);
    }

    return successResponse(data);
  }
);

/**
 * PATCH /api/projects/[id]
 * Update existing project
 * Requires authentication
 */
export const PATCH = withErrorHandling(
  async (request: NextRequest,{ params }) => {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return errorResponse("Unauthorized. Please login.", 401);
    }

    const id = params?.id;
    const body = await request.json();

    // Validate input
    const validationResult = projectFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error;
      return errorResponse(`Validation error: ${errors}`, 400);
    }

    const validatedData = validationResult.data;

    // Check if slug changed and ensure uniqueness
    let slug = validatedData.slug;
    if (!slug || slug.trim() === "") {
      slug = generateSlug(validatedData.title);
    }

    // Get existing slugs except current project
    const { data: existingProjects } = await supabase
      .from("projects")
      .select("slug")
      .neq("id", id);

    const existingSlugs = existingProjects?.map((p) => p.slug) || [];

    if (existingSlugs.includes(slug)) {
      slug = generateUniqueSlug(slug, existingSlugs);
    }

    // Update project
    const { data, error } = await supabase
      .from("projects")
      .update({
        ...validatedData,
        slug,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return errorResponse("Project tidak ditemukan", 404);
      }
      console.error("Database error:", error);
      return errorResponse("Gagal update project", 500);
    }

    return successResponse(data, "Project berhasil diupdate");
  }
);

/**
 * DELETE /api/projects/[id]
 * Delete project
 * Requires authentication
 */
export const DELETE = withErrorHandling(
  async (request: NextRequest, { params }) => {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return errorResponse("Unauthorized. Please login.", 401);
    }

    const id = params?.id;

    // Delete project
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      console.error("Database error:", error);
      return errorResponse("Gagal menghapus project", 500);
    }

    return successResponse(null, "Project berhasil dihapus");
  }
);
