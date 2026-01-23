export type ProjectStatus = "available" | "coming_soon" | "sold_out";
export type SubmissionStatus = "new" | "contacted" | "closed";

export interface Project {
  id: number;
  slug: string;
  name: string;
  status: ProjectStatus;
  price_range: string;
  location: string;
  full_address: string;
  description: string;
  main_image: string;
  site_plan: string;
  is_featured: boolean;
  featured_order: number | null;
  created_at: string;
  updated_at: string;
  price: string;
  land_size: string;
  building_size: string;
  floor_count: string;
  display_order: number | null;
}

export interface ContactSubmission {
  id: string;
  name: string;
  gender: string | null;
  phone: string;
  email: string;
  domicile: string | null;
  message: string | null;
  status: SubmissionStatus;
  created_at: string;
}

export interface ProjectGallery {
  id: number;
  project_id: number;
  image_url: string;
  created_at: string;
}

export interface ProjectFeature {
  id: number;
  project_id: number;
  name: string;
  image_url: string;
  created_at: string;
}

export interface ProjectSurrounding {
  id: number;
  project_id: number;
  name: string;
  image_url: string;
  distance_km: number;
  distance_menit: number;
  created_at: string;
}

export interface ProjectHouseType {
  id: number;
  project_id: number;
  name: string;
  image_url: string;
  created_at: string;
}

export interface ProjectFacility {
  id: number;
  project_id: number;
  name: string;
  image_url: string;
  created_at: string;
}

export interface ProjectWithRelations extends Project {
  project_galleries: ProjectGallery[];
  project_features: ProjectFeature[];
  project_surroundings: ProjectSurrounding[];
  project_house_types: ProjectHouseType[];
  project_facilities: ProjectFacility[];
}

// ============================================
// Input types for CREATE/UPDATE operations
// ============================================

/** Input for creating a new project (omits auto-generated fields) */
export type ProjectCreateInput = Omit<
  Project,
  "id" | "created_at" | "updated_at"
>;

/** Input for updating a project (all fields optional) */
export type ProjectUpdateInput = Partial<ProjectCreateInput>;

/** Input for creating a gallery image */
export type ProjectGalleryInput = Omit<ProjectGallery, "id" | "created_at">;

/** Input for creating a feature */
export type ProjectFeatureInput = Omit<ProjectFeature, "id" | "created_at">;

/** Input for creating a surrounding */
export type ProjectSurroundingInput = Omit<
  ProjectSurrounding,
  "id" | "created_at"
>;

/** Input for creating a house type */
export type ProjectHouseTypeInput = Omit<ProjectHouseType, "id" | "created_at">;

/** Input for creating a facility */
export type ProjectFacilityInput = Omit<ProjectFacility, "id" | "created_at">;

/** Full project create input including child relations */
export interface ProjectWithRelationsInput extends ProjectCreateInput {
  galleries?: Omit<ProjectGalleryInput, "project_id">[];
  features?: Omit<ProjectFeatureInput, "project_id">[];
  surroundings?: Omit<ProjectSurroundingInput, "project_id">[];
  house_types?: Omit<ProjectHouseTypeInput, "project_id">[];
  facilities?: Omit<ProjectFacilityInput, "project_id">[];
}
