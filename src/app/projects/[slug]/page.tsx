import { ContactFormSection } from "@/components/home/contact-form-section";
import { createClient } from "@/lib/supabase/client";
import ProjectDetailPage from "@/components/our-projects/project-detail/ProjectDetailPage";
import { ProjectEuy } from "./type";
export const dynamicParams = false;

// Generate static params untuk build time
export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select("slug");

  if (!projects) return [];

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient(); // Use server client with cookies for the page

  // Fetch specific project
  const { data: dbProject } = await supabase
    .from("projects")
    .select("*")
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

  // Map DB data to ProjectEuy type
  const project: ProjectEuy = {
    id: dbProject.id,
    slug: dbProject.slug,
    name: dbProject.name,
    status: dbProject.status,
    priceRange: dbProject.price_range,
    location: dbProject.location,
    fullAddress: dbProject.full_address,
    description: dbProject.description,
    mainImage: dbProject.main_image,
    sitePlan: dbProject.site_plan,

    // Provide empty arrays for complex fields not yet in DB
    gallery: [],
    features: [],
    surroundings: [],
    houseTypes: [],
    facilities: [],
  };

  return (
    <>
      <ProjectDetailPage project={project} />
      <ContactFormSection />
    </>
  );
}
