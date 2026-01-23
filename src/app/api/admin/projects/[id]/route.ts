import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  successResponse,
  errorResponse,
  ApiResponse,
} from "@/lib/api-response";
import {
  projectUpdateSchema,
  type ProjectUpdateInput,
} from "@/lib/validations/project";
import { deleteMultipleImagesServer } from "@/lib/upload-server";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * Wrapper for error handling specific to this route
 */
function handleRouteError(error: unknown): NextResponse<ApiResponse> {
  console.error("API Error:", error);
  const message =
    error instanceof Error ? error.message : "Terjadi kesalahan pada server";
  return errorResponse(message, 500);
}

/**
 * GET /api/admin/projects/[id]
 * Get a single project by ID with all relations
 */
export async function GET(
  _request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<ApiResponse>> {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id, 10);

    if (isNaN(projectId)) {
      return errorResponse("ID project tidak valid. Harus berupa angka.", 400);
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("projects")
      .select(
        `
        *,
        project_galleries (*),
        project_features (*),
        project_surroundings (*),
        project_house_types (*),
        project_facilities (*)
      `,
      )
      .eq("id", projectId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return errorResponse(
          `Project dengan ID ${projectId} tidak ditemukan`,
          404,
        );
      }
      console.error("Failed to fetch project:", error);
      return errorResponse(
        `Gagal mengambil data project: ${error.message}`,
        500,
      );
    }

    return successResponse(data);
  } catch (error) {
    return handleRouteError(error);
  }
}

/**
 * PUT /api/admin/projects/[id]
 * Update a project and optionally its relations
 *
 * Data Flow:
 * 1. Validate project ID
 * 2. Parse and validate request body
 * 3. Update parent record
 * 4. If relations provided, delete old and insert new (replace strategy)
 * 5. Return updated project with relations
 */
export async function PUT(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<ApiResponse>> {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id, 10);

    if (isNaN(projectId)) {
      return errorResponse("ID project tidak valid. Harus berupa angka.", 400);
    }

    const supabase = await createClient();

    // Step 1: Check if project exists
    const { data: existingProject, error: checkError } = await supabase
      .from("projects")
      .select("id")
      .eq("id", projectId)
      .single();

    if (checkError || !existingProject) {
      return errorResponse(
        `Project dengan ID ${projectId} tidak ditemukan`,
        404,
      );
    }

    // Step 2: Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorResponse("Invalid JSON body", 400);
    }

    // Step 3: Validate input
    const validation = projectUpdateSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues
        .map((e) => `${e.path.map(String).join(".")}: ${e.message}`)
        .join("; ");
      return errorResponse(`Validation error: ${errors}`, 400);
    }

    const input: ProjectUpdateInput = validation.data;

    // Step 4: Extract parent and child data
    const {
      galleries,
      features,
      surroundings,
      house_types,
      facilities,
      ...projectData
    } = input;

    // Step 5: Update parent record if there's data to update
    if (Object.keys(projectData).length > 0) {
      const { error: updateError } = await supabase
        .from("projects")
        .update({ ...projectData, updated_at: new Date().toISOString() })
        .eq("id", projectId);

      if (updateError) {
        console.error("Failed to update project:", updateError);

        if (updateError.code === "23505") {
          return errorResponse(
            `Slug "${projectData.slug}" sudah digunakan. Gunakan slug yang berbeda.`,
            409,
          );
        }

        return errorResponse(
          `Gagal mengupdate project: ${updateError.message}`,
          500,
        );
      }
    }

    // Step 6: Update child relations (replace strategy: delete old, insert new)
    const childUpdateErrors: string[] = [];

    // Helper function for replacing child records
    async function replaceChildRecords<T extends Record<string, unknown>>(
      tableName: string,
      records: T[] | undefined,
      buildRecord: (item: T) => Record<string, unknown>,
    ) {
      if (records === undefined) return; // Not provided, skip

      // Delete existing records
      const { error: deleteError } = await supabase
        .from(tableName)
        .delete()
        .eq("project_id", projectId);

      if (deleteError) {
        console.error(`Failed to delete ${tableName}:`, deleteError);
        childUpdateErrors.push(`${tableName} delete: ${deleteError.message}`);
        return;
      }

      // Insert new records if any
      if (records.length > 0) {
        const newRecords = records.map(buildRecord);
        const { error: insertError } = await supabase
          .from(tableName)
          .insert(newRecords);

        if (insertError) {
          console.error(`Failed to insert ${tableName}:`, insertError);
          childUpdateErrors.push(`${tableName} insert: ${insertError.message}`);
        }
      }
    }

    // Replace galleries
    await replaceChildRecords("project_galleries", galleries, (g) => ({
      project_id: projectId,
      image_url: g.image_url,
    }));

    // Replace features
    await replaceChildRecords("project_features", features, (f) => ({
      project_id: projectId,
      name: f.name,
      image_url: f.image_url,
    }));

    // Replace surroundings
    await replaceChildRecords("project_surroundings", surroundings, (s) => ({
      project_id: projectId,
      name: s.name,
      image_url: s.image_url,
      distance_km: s.distance_km,
      distance_minutes: s.distance_minutes,
    }));

    // Replace house types
    await replaceChildRecords("project_house_types", house_types, (h) => ({
      project_id: projectId,
      name: h.name,
      image_url: h.image_url,
    }));

    // Replace facilities
    await replaceChildRecords("project_facilities", facilities, (f) => ({
      project_id: projectId,
      name: f.name,
      image_url: f.image_url,
    }));

    // Step 7: Fetch updated project with relations
    const { data: updatedProject, error: fetchError } = await supabase
      .from("projects")
      .select(
        `
        *,
        project_galleries (*),
        project_features (*),
        project_surroundings (*),
        project_house_types (*),
        project_facilities (*)
      `,
      )
      .eq("id", projectId)
      .single();

    if (fetchError) {
      console.error("Failed to fetch updated project:", fetchError);
      return errorResponse(
        `Gagal mengambil data project yang diupdate: ${fetchError.message}`,
        500,
      );
    }

    const message =
      childUpdateErrors.length > 0
        ? `Project berhasil diupdate dengan beberapa error: ${childUpdateErrors.join("; ")}`
        : "Project berhasil diupdate";

    return successResponse(updatedProject, message);
  } catch (error) {
    return handleRouteError(error);
  }
}

/**
 * DELETE /api/admin/projects/[id]
 * Delete a project and all its relations
 *
 * Data Flow:
 * 1. Validate project ID
 * 2. Fetch project with relations to get image URLs
 * 3. Delete images from Storage
 * 4. Delete child records (or rely on CASCADE if configured)
 * 5. Delete parent record
 * 6. Return success
 */
export async function DELETE(
  _request: NextRequest,
  context: RouteContext,
): Promise<NextResponse<ApiResponse>> {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id, 10);

    if (isNaN(projectId)) {
      return errorResponse("ID project tidak valid. Harus berupa angka.", 400);
    }

    const supabase = await createClient();

    // Step 1: Fetch project with relations to get all image URLs
    const { data: project, error: fetchError } = await supabase
      .from("projects")
      .select(
        `
        *,
        project_galleries (image_url),
        project_features (image_url),
        project_surroundings (image_url),
        project_house_types (image_url),
        project_facilities (image_url)
      `,
      )
      .eq("id", projectId)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return errorResponse(
          `Project dengan ID ${projectId} tidak ditemukan`,
          404,
        );
      }
      console.error("Failed to fetch project for deletion:", fetchError);
      return errorResponse(
        `Gagal mengambil data project: ${fetchError.message}`,
        500,
      );
    }

    // Step 2: Collect all image URLs for Storage cleanup
    const imageUrls: string[] = [];

    if (project.main_image) imageUrls.push(project.main_image);
    if (project.site_plan) imageUrls.push(project.site_plan);

    // Collect from child relations
    const collectImages = (items: { image_url?: string | null }[] | null) => {
      if (!items) return;
      for (const item of items) {
        if (item.image_url) imageUrls.push(item.image_url);
      }
    };

    collectImages(project.project_galleries);
    collectImages(project.project_features);
    collectImages(project.project_surroundings);
    collectImages(project.project_house_types);
    collectImages(project.project_facilities);

    // Step 3: Delete child records first (if no CASCADE configured)
    const childTables = [
      "project_galleries",
      "project_features",
      "project_surroundings",
      "project_house_types",
      "project_facilities",
    ];

    for (const table of childTables) {
      const { error: deleteError } = await supabase
        .from(table)
        .delete()
        .eq("project_id", projectId);

      if (deleteError) {
        console.error(`Failed to delete ${table}:`, deleteError);
        // Continue with deletion, don't fail entirely
      }
    }

    // Step 4: Delete parent record
    const { error: deleteProjectError } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (deleteProjectError) {
      console.error("Failed to delete project:", deleteProjectError);
      return errorResponse(
        `Gagal menghapus project: ${deleteProjectError.message}`,
        500,
      );
    }

    // Step 5: Delete images from Storage (best-effort, don't fail if Storage cleanup fails)
    if (imageUrls.length > 0) {
      try {
        // Filter to only include Supabase Storage URLs
        const storageUrls = imageUrls.filter((url) =>
          url.includes("supabase.co/storage"),
        );

        if (storageUrls.length > 0) {
          await deleteMultipleImagesServer(storageUrls);
        }
      } catch (storageError) {
        console.error("Failed to cleanup Storage images:", storageError);
        // Don't fail the request, project is already deleted
      }
    }

    return successResponse(
      { id: projectId, deleted: true },
      `Project dengan ID ${projectId} berhasil dihapus`,
    );
  } catch (error) {
    return handleRouteError(error);
  }
}
