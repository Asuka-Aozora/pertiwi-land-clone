import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Pertiwi Land
            </h2>

            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Pertiwi Land adalah pengembang real estat yang berbasis di
                Bandung, berdiri sejak 2011 dan telah sukses membangun lebih
                dari 13 proyek di berbagai lokasi di Jawa Barat.
              </p>

              <p>
                Kami berkomitmen menghadirkan hunian dengan desain berkelas dan
                hasil terbaik, mengutamakan kualitas material, craftsmanship,
                serta tata ruang yang fungsional.
              </p>

              <p>
                Setiap proyek dirancang untuk memberikan kenyamanan, estetika,
                dan nilai investasi tinggi, didukung oleh fitur unggulan serta
                lingkungan yang asri dan strategis, guna menciptakan kehidupan
                yang lebih berkualitas bagi para penghuni.
              </p>
            </div>

            <Button size="lg" className="mt-8" asChild>
              <Link href="/about">
                Baca selengkapnya
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                  alt="Modern architecture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-4/3 overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
                  alt="House exterior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative aspect-4/3 overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80"
                  alt="House interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80"
                  alt="Modern living room"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
