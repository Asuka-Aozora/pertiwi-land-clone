import { ContactFormSection } from "@/components/home/contact-form-section";
import { createClient } from "@/lib/supabase/server";
// import { Footer } from "@/components/layout/footer";
import ProjectDetailPage from "@/components/our-projects/project-detail/ProjectDetailPage";
import { ProjectEuy } from "./type";


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
  
  // Fetch project galleries
  const { data: dbGallery } = await supabase
    .from("project_galleries")
    .select("*")
    .eq("project_id", dbProject.id)
  const gallery = dbGallery?.map((item) => item.image_url);

  // Fetch project features
  const { data: dbFeatures } = await supabase
    .from("project_features")
    .select("*")
    .eq("project_id", dbProject.id)
  const features = dbFeatures?.map((item) => item.image_url);

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

  // Merge DB data with static data (fallback for complex fields)
  // We prioritize DB properties where they map to ProjectEuy
  const project: ProjectEuy = {
    // Default to static if exists, so we get the arrays (gallery, etc)
    ...dbProject,

    // Override with DB data
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

    // Restore complex arrays from static if DB doesn't have them (which it likely doesn't for now)
    // If staticProject is undefined (new project in DB but not in static code), we provide empty arrays
    gallery: gallery || [],
    features: dbFeatures || [],
    surroundings: dbProject?.surroundings || [],
    houseTypes: dbProject?.house_types || [],
    facilities: dbProject?.facilities || [],  
  };

  return (
    <>
      <ProjectDetailPage project={project} />
      <ContactFormSection />
    </>
  );
}
