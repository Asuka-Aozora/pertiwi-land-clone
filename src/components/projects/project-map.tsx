interface ProjectMapProps {
  mapEmbed: string;
  location: string;
}

/**
 * Embedded Google Maps iframe
 * Displays project location
 */
export function ProjectMap({ mapEmbed, location }: ProjectMapProps) {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Lokasi</h2>
        <p className="text-muted-foreground mb-6">{location}</p>

        {/* Map Embed */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-muted">
          <iframe
            src={mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${location}`}
          />
        </div>
      </div>
    </section>
  );
}
