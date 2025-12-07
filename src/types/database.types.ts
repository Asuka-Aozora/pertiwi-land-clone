export type ProjectStatus = "available" | "coming_soon" | "sold_out";
export type SubmissionStatus = "new" | "contacted" | "closed";

export interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  description: string | null;
  status: ProjectStatus;
  price_start: number | null;
  price_end: number | null;
  land_area: string | null;
  building_area: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  image_url: string | null;
  gallery: string[];
  features: string[];
  amenities: string[];
  map_embed: string | null;
  brochure_url: string | null;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
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

export interface ProjectFormData {
  title: string;
  slug: string;
  location: string;
  description?: string;
  status: ProjectStatus;
  price_start?: number;
  price_end?: number;
  land_area?: string;
  building_area?: string;
  bedrooms?: number;
  bathrooms?: number;
  features: string[];
  amenities: string[];
  map_embed?: string;
  is_featured: boolean;
  display_order: number;
}
