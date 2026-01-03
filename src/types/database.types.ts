export type ProjectStatus = "available" | "coming_soon" | "sold_out";
export type SubmissionStatus = "new" | "contacted" | "closed";

export interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  image_url: string | null;
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
