import { CheckCircle2 } from "lucide-react";

interface ProjectFeaturesProps {
  features: string[];
  amenities: string[];
}

export function ProjectFeatures({ features, amenities }: ProjectFeaturesProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Features */}
          {features && features.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Fitur Unggulan</h2>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Amenities */}
          {amenities && amenities.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Fasilitas</h2>
              <ul className="space-y-3">
                {amenities.map((amenity, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
                    <span className="text-muted-foreground">{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}