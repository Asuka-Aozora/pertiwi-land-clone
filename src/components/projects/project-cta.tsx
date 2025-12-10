import { Button } from "@/components/ui/button";
import { MessageCircle, FileText } from "lucide-react";
import type { Project } from "@/types/database.types";

interface ProjectCTAProps {
  project: Project;
}

/**
 * Call-to-action section
 * WhatsApp contact dan brochure download
 */
export function ProjectCTA({ project }: ProjectCTAProps) {
  const whatsappMessage = `Halo, saya tertarik dengan proyek ${project.title} di ${project.location}. Bisa minta info lebih lanjut?`;
  const whatsappUrl = `https://wa.me/${
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  }?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Tertarik dengan Proyek Ini?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Hubungi kami sekarang untuk informasi lebih lanjut, jadwal site visit,
          atau konsultasi gratis dengan tim marketing kami.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* WhatsApp Button */}
          <Button size="lg" variant="secondary" asChild>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Hubungi via WhatsApp
            </a>
          </Button>

          {/* Brochure Download Button */}
          {project.brochure_url && (
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <a
                href={project.brochure_url}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <FileText className="mr-2 h-5 w-5" />
                Download Brosur
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
