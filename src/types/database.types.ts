export type ProjectStatus = "available" | "coming_soon" | "sold_out";
export type SubmissionStatus = "new" | "contacted" | "closed";

export interface Project {
  id: number;
  title: string;
  slug: string;
  location: string;
  image_url: string | null;
  display_order: number;
  created_at: string;
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
