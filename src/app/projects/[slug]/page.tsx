import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import type { Project } from "@/types/database.types";
import { ProjectHero } from "@/components/projects/project-hero";
import { ProjectInfo } from "@/components/projects/project-info";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectFeatures } from "@/components/projects/project-features";
import { ProjectMap } from "@/components/projects/project-map";
import { ProjectCTA } from "@/components/projects/project-cta";

/**
 * Project Detail Page - Server Component
 * Fetch single project by slug dan display full details
 */
export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();

  // Fetch project by slug
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", params.slug)
    .single();

  // Handle not found
  if (error || !project) {
    notFound();
  }

  return (
    <main>
      <ProjectHero project={project as Project} />
      <ProjectInfo project={project as Project} />

      {project.gallery && project.gallery.length > 0 && (
        <ProjectGallery gallery={project.gallery} title={project.title} />
      )}

      {(project.features?.length > 0 || project.amenities?.length > 0) && (
        <ProjectFeatures
          features={project.features}
          amenities={project.amenities}
        />
      )}

      {project.map_embed && (
        <ProjectMap mapEmbed={project.map_embed} location={project.location} />
      )}

      <ProjectCTA project={project as Project} />
    </main>
  );
}

/**
 * Generate static params untuk static generation
 * Fetch all project slugs
 */
export async function generateStaticParams() {
  const supabase = await createClient();

  const { data: projects } = await supabase.from("projects").select("slug");

  return (
    projects?.map((project) => ({
      slug: project.slug,
    })) || []
  );
}

/**
 * Dynamic metadata untuk SEO
 */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("title, description, location, image_url")
    .eq("slug", params.slug)
    .single();

  if (!project) {
    return {
      title: "Project Not Found - Pertiwi Land",
    };
  }

  return {
    title: `${project.title} - Pertiwi Land`,
    description:
      project.description ||
      `${project.title} di ${project.location}. Hunian modern dengan fasilitas lengkap dari Pertiwi Land.`,
    openGraph: {
      images: project.image_url ? [project.image_url] : [],
    },
  };
}
