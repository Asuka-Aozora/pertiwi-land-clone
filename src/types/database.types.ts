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
