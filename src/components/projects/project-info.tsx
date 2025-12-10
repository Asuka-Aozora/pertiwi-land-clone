import { formatPriceRange } from "@/lib/format";
import { Bed, Bath, Maximize, Home } from "lucide-react";
import type { Project } from "@/types/database.types";

interface ProjectInfoProps {
  project: Project;
}

/**
 * Project information section
 * Price, specs, dan description
 */
export function ProjectInfo({ project }: ProjectInfoProps) {
  const specs = [
    ...(project.bedrooms
      ? [
          {
            icon: Bed,
            label: "Kamar Tidur",
            value: `${project.bedrooms} Kamar`,
          },
        ]
      : []),
    ...(project.bathrooms
      ? [
          {
            icon: Bath,
            label: "Kamar Mandi",
            value: `${project.bathrooms} Kamar`,
          },
        ]
      : []),
    ...(project.land_area
      ? [
          {
            icon: Maximize,
            label: "Luas Tanah",
            value: project.land_area,
          },
        ]
      : []),
    ...(project.building_area
      ? [
          {
            icon: Home,
            label: "Luas Bangunan",
            value: project.building_area,
          },
        ]
      : []),
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Price & Specs */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price */}
              {(project.price_start || project.price_end) && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Harga
                  </h3>
                  <p className="text-3xl font-bold text-primary">
                    {formatPriceRange(project.price_start, project.price_end)}
                  </p>
                </div>
              )}

              {/* Specs Grid */}
              {specs.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">
                    Spesifikasi
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {specs.map((spec, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center p-4 rounded-lg border bg-muted/50"
                      >
                        <spec.icon className="h-6 w-6 text-primary mb-2" />
                        <p className="text-xs text-muted-foreground mb-1">
                          {spec.label}
                        </p>
                        <p className="text-sm font-semibold text-center">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="lg:col-span-2">
            {project.description && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Tentang Proyek</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground whitespace-pre-line">
                    {project.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
