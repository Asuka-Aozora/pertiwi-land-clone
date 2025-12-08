import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
        alt="Modern house exterior"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark Overlay untuk readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full">
        <div className="flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            In every brick, every beam,
            <br />
            <span className="text-primary">family builds the house</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-gray-200">
            Wujudkan hunian impian Anda bersama Pertiwi Land. Pengembang
            properti terpercaya dengan lebih dari 13 proyek sukses di Jawa
            Barat.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#projects">Lihat Proyek Kami</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-white/10 backdrop-blur hover:bg-white/20"
            >
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Hubungi Kami
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
