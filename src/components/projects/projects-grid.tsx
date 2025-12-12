import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath } from "lucide-react";
import { formatPriceRange } from "@/lib/format";
import type { Project } from "@/types/database.types";

interface ProjectsGridProps {
  projects: Project[];
}

/**
 * Grid layout untuk display projects
 * Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop
 */
export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

/**
 * Individual project card component
 */
function ProjectCard({ project }: { project: Project }) {
  const statusConfig = {
    available: { label: "Tersedia", variant: "default" as const },
    coming_soon: { label: "Coming Soon", variant: "secondary" as const },
    sold_out: { label: "Sold Out", variant: "destructive" as const },
  };

  const config = statusConfig[project.status];

  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg h-full">
        {/* Image */}
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          {project.image_url ? (
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">No image</p>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute right-2 top-2">
            <Badge variant={config.variant}>{config.label}</Badge>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Title */}
          <h3 className="text-xl font-semibold line-clamp-1 mb-2">
            {project.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <MapPin className="mr-1 h-4 w-4 shrink-0" />
            <span className="line-clamp-1">{project.location}</span>
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {project.description}
            </p>
          )}

          {/* Price */}
          {(project.price_start || project.price_end) && (
            <p className="text-lg font-semibold text-primary mb-3">
              {formatPriceRange(project.price_start, project.price_end)}
            </p>
          )}

          {/* Specs */}
          {(project.bedrooms || project.bathrooms || project.land_area) && (
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
              {project.bedrooms && (
                <div className="flex items-center">
                  <Bed className="mr-1 h-4 w-4" />
                  <span>{project.bedrooms} KT</span>
                </div>
              )}
              {project.bathrooms && (
                <div className="flex items-center">
                  <Bath className="mr-1 h-4 w-4" />
                  <span>{project.bathrooms} KM</span>
                </div>
              )}
              {project.land_area && <span>LT: {project.land_area}</span>}
            </div>
          )}

          {/* CTA */}
          <div className="text-sm font-medium text-primary group-hover:underline">
            Lihat Detail →
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
