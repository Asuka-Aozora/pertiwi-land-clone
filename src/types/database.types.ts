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
