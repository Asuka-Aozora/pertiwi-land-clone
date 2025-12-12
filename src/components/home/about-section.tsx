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
              TerasLand
            </h2>

            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Terasland adalah pengembang properti yang berkomitmen
                menghadirkan hunian modern dengan nilai investasi jangka
                panjang.
              </p>

              <p>
                Dengan mengutamakan kualitas, transparansi, dan inovasi, kami
                membangun proyek yang tidak hanya memberikan tempat tinggal,
                tetapi juga nilai bagi pemilik dan lingkungannya.
              </p>

              <p>
                Setiap proyek dirancang untuk memberikan kenyamanan, estetika,
                dan nilai investasi tinggi, didukung oleh fitur unggulan serta
                lingkungan yang asri dan strategis, guna menciptakan kehidupan
                yang lebih berkualitas bagi para penghuni.
              </p>
            </div>

            <Button size="lg" className="mt-8" variant={"hijau"} asChild>
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
                  src="/about/image-aspect-1square.jpg"
                  alt="Modern architecture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-4/3 overflow-hidden rounded-lg">
                <Image
                  src="/about/image-aspect-miring1.jpg"
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
                  src="/about/image-aspect-miring2.jpg"
                  alt="House interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/about/image-aspect-2square.jpg"
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
