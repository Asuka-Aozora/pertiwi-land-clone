import { ProjectsFilter } from "@/components/projects/projects-filter";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { createClient } from "@/lib/supabase/server";import type { Project } from "@/types/database.types";

/**
 * Projects List Page - Server Component
 * Fetch all projects dan display dalam grid dengan filter
 *
 * Searchparams:
 * - status: Filter by status
 * - location: Filter by location (search)
 */
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { status?: string; location?: string };
}) {
    const supabase = await createClient();
    const search = await searchParams

  // Build query
  let query = supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  // Apply filters dari URL params
  if (search.status) {
    query = query.eq("status", search.status);
  }

  if (search.location) {
    query = query.ilike("location", `%${search.location}%`);
  }

  const { data: projects } = await query;

  return (
    <main>
      {/* Header Section */}
      <section className="border-b bg-muted/50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Temukan hunian impian Anda dari berbagai pilihan proyek kami di
            lokasi strategis di Jawa Barat.
          </p>
        </div>
      </section>

      {/* Filter & Grid Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Filter Component */}
          <ProjectsFilter />

          {/* Projects Grid */}
          {projects && projects.length > 0 ? (
            <ProjectsGrid projects={projects as Project[]} />
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Tidak ada proyek yang sesuai dengan filter Anda.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/**
 * SEO Metadata
 */
export const metadata = {
  title: "Our Projects - Pertiwi Land",
  description:
    "Jelajahi berbagai proyek properti berkualitas dari Pertiwi Land di lokasi strategis di Jawa Barat. Rumah modern dengan harga kompetitif.",
};
