import { ContactFormSection } from "@/components/home/contact-form-section";
import { createClient } from "@/lib/supabase/server";
import ProjectDetailPage from "@/components/our-projects/project-detail/ProjectDetailPage";
import { ProjectEuy } from "./type";
import { ProjectWithRelations } from "@/types/database.types";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient(); // Use server client with cookies for the page

  // Fetch specific project with all relations in ONE query
  const { data: dbProject } = await supabase
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
    .eq("slug", slug)
    .single();

  if (!dbProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <a href="/projects" className="text-blue-600 hover:underline">
            Back to Projects
          </a>
        </div>
      </div>
    );
  }

  // Cast to defined type to ensure type safety
  const p = dbProject as unknown as ProjectWithRelations;

  const gallery = p.project_galleries?.map((item) => item.image_url) ?? [];

  // Map surroundings to convert ID from number to string if needed by ProjectEuy
  const surroundings =
    p.project_surroundings?.map((s) => ({
      ...s,
      id: String(s.id),
    })) ?? [];

  const features = p.project_features ?? [];
  const houseTypes = p.project_house_types ?? [];
  const facilities = p.project_facilities ?? [];

  // Map DB data to ProjectEuy type
  const project: ProjectEuy = {
    // Override with DB data
    id: p.id,
    slug: p.slug,
    name: p.name,
    status: p.status,
    priceRange: p.price_range,
    location: p.location,
    fullAddress: p.full_address,
    description: p.description,
    mainImage: p.main_image,
    sitePlan: p.site_plan,

    gallery: gallery,
    features: features,
    surroundings: surroundings,
    houseTypes: houseTypes,
    facilities: facilities,
  };

  return (
    <>
      <ProjectDetailPage project={project} />
      <ContactFormSection />
    </>
  );
}
