import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  successResponse,
  errorResponse,
  withErrorHandling,
} from "@/lib/api-response";
import {
  projectCreateSchema,
  type ProjectCreateInput,
} from "@/lib/validations/project";


/**
 * GET /api/admin/projects
 * List all projects with relations (admin view)
 */
export const GET = withErrorHandling(async () => {
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
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch projects:", error);
    return errorResponse(
      `Gagal mengambil data projects: ${error.message}`,
      500,
    );
  }

  return successResponse(data, "Berhasil mengambil data projects");
});

/**
 * POST /api/admin/projects
 * Create a new project with all relations
 *
 * Data Flow:
 * 1. Parse and validate request body
 * 2. Insert parent record (projects) → get project_id
 * 3. Insert child records with project_id
 * 4. Return complete project with relations
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  const supabase = await createClient();

  // Step 1: Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }

  // Step 2: Validate input
  const validation = projectCreateSchema.safeParse(body);
  if (!validation.success) {
    const errors = validation.error.issues
      .map((e) => `${e.path.map(String).join(".")}: ${e.message}`)
      .join("; ");
    return errorResponse(`Validation error: ${errors}`, 400);
  }

  const input: ProjectCreateInput = validation.data;

  // Step 3: Extract parent data (excluding child relations)
  const {
    galleries,
    features,
    surroundings,
    house_types,
    facilities,
    ...projectData
  } = input;

  // Step 4: Insert parent record
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .insert(projectData)
    .select()
    .single();

  if (projectError) {
    console.error("Failed to insert project:", projectError);

    // Handle unique constraint violation (slug)
    if (projectError.code === "23505") {
      return errorResponse(
        `Slug "${projectData.slug}" sudah digunakan. Gunakan slug yang berbeda.`,
        409,
      );
    }

    // Handle check constraint violation (status)
    if (projectError.code === "23514") {
      return errorResponse(
        `Status tidak valid. Gunakan 'available' atau 'ongoing'.`,
        400,
      );
    }

    return errorResponse(`Gagal membuat project: ${projectError.message}`, 500);
  }

  const projectId = project.id;

  // Step 5: Insert child relations with the returned project_id
  // Note: We insert even empty arrays are skipped

  const childInsertErrors: string[] = [];

  // Insert galleries
  if (galleries && galleries.length > 0) {
    const galleryRecords = galleries.map((g) => ({
      project_id: projectId,
      image_url: g.image_url,
    }));

    const { error: galleryError } = await supabase
      .from("project_galleries")
      .insert(galleryRecords);

    if (galleryError) {
      console.error("Failed to insert galleries:", galleryError);
      childInsertErrors.push(`galleries: ${galleryError.message}`);
    }
  }

  // Insert features
  if (features && features.length > 0) {
    const featureRecords = features.map((f) => ({
      project_id: projectId,
      name: f.name,
      image_url: f.image_url,
    }));

    const { error: featureError } = await supabase
      .from("project_features")
      .insert(featureRecords);

    if (featureError) {
      console.error("Failed to insert features:", featureError);
      childInsertErrors.push(`features: ${featureError.message}`);
    }
  }

  // Insert surroundings
  if (surroundings && surroundings.length > 0) {
    const surroundingRecords = surroundings.map((s) => ({
      project_id: projectId,
      name: s.name,
      image_url: s.image_url,
      distance_km: s.distance_km,
      distance_minutes: s.distance_minutes,
    }));

    const { error: surroundingError } = await supabase
      .from("project_surroundings")
      .insert(surroundingRecords);

    if (surroundingError) {
      console.error("Failed to insert surroundings:", surroundingError);
      childInsertErrors.push(`surroundings: ${surroundingError.message}`);
    }
  }

  // Insert house types
  if (house_types && house_types.length > 0) {
    const houseTypeRecords = house_types.map((h) => ({
      project_id: projectId,
      name: h.name,
      image_url: h.image_url,
    }));

    const { error: houseTypeError } = await supabase
      .from("project_house_types")
      .insert(houseTypeRecords);

    if (houseTypeError) {
      console.error("Failed to insert house types:", houseTypeError);
      childInsertErrors.push(`house_types: ${houseTypeError.message}`);
    }
  }

  // Insert facilities
  if (facilities && facilities.length > 0) {
    const facilityRecords = facilities.map((f) => ({
      project_id: projectId,
      name: f.name,
      image_url: f.image_url,
    }));

    const { error: facilityError } = await supabase
      .from("project_facilities")
      .insert(facilityRecords);

    if (facilityError) {
      console.error("Failed to insert facilities:", facilityError);
      childInsertErrors.push(`facilities: ${facilityError.message}`);
    }
  }

  // Step 6: Fetch complete project with relations
  const { data: completeProject, error: fetchError } = await supabase
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
    console.error("Failed to fetch complete project:", fetchError);
    // Project was created but we can't fetch it - still return success with partial data
    return successResponse(
      { ...project, _childInsertErrors: childInsertErrors },
      childInsertErrors.length > 0
        ? `Project berhasil dibuat dengan beberapa error pada relasi: ${childInsertErrors.join("; ")}`
        : "Project berhasil dibuat",
      201,
    );
  }

  // Step 7: Return response
  const message =
    childInsertErrors.length > 0
      ? `Project berhasil dibuat dengan beberapa error pada relasi: ${childInsertErrors.join("; ")}`
      : "Project berhasil dibuat";

  return successResponse(completeProject, message, 201);
});
