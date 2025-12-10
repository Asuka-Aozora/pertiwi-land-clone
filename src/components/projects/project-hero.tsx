import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import type { Project } from "@/types/database.types";

interface ProjectHeroProps {
  project: Project;
}

/**
 * Hero section untuk project detail page
 * Full-width image dengan title overlay
 */
export function ProjectHero({ project }: ProjectHeroProps) {
  const statusConfig = {
    available: { label: "Tersedia", variant: "default" as const },
    coming_soon: { label: "Coming Soon", variant: "secondary" as const },
    sold_out: { label: "Sold Out", variant: "destructive" as const },
  };

  const config = statusConfig[project.status];

  return (
    <section className="relative h-[500px] w-full overflow-hidden">
      {/* Background Image */}
      {project.image_url ? (
        <Image
          src={project.image_url}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div className="h-full w-full bg-muted" />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full">
        <div className="flex h-full flex-col justify-end pb-12">
          {/* Status Badge */}
          <div className="mb-4">
            <Badge variant={config.variant} className="text-sm">
              {config.label}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {project.title}
          </h1>

          {/* Location */}
          <div className="flex items-center text-lg text-gray-200">
            <MapPin className="mr-2 h-5 w-5" />
            <span>{project.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
