import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import type { Project } from "@/types/database.types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Produk Unggulan yang Tersedia
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pilih lokasi dan desain rumah sesuai dengan yang kamu mau!
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/projects">
              Lihat Semua Proyek
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * Project card component
 * NOTE:
 * - Link langsung ke /projects/[slug]
 * - Status DIHAPUS total
 */
function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          {project.main_image ? (
            <Image
              src={project.main_image}
              alt={project.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">No image</p>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="text-xl font-semibold line-clamp-1">{project.name}</h3>

          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            <span className="line-clamp-1">{project.location}</span>
          </div>

          {/* CTA */}
          <div className="mt-4 text-sm font-medium text-primary group-hover:underline">
            Lihat Detail →
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
