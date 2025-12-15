import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OverlayOpacity = "light" | "medium" | "dark";

interface HeroSectionProps {
  img: string;
  h1Up?: string;
  h1Down?: string;
  rightButton?: string;
  leftButton?: string;
  overlay?: boolean;
  overlayOpacity?: OverlayOpacity;
}

export function HeroSection({
  img,
  h1Up,
  h1Down,
  rightButton,
  leftButton,
  overlay = true,
  overlayOpacity = "medium",
}: HeroSectionProps) {
  const overlayClassMap: Record<OverlayOpacity, string> = {
    light: "bg-black/30",
    medium: "bg-black/50",
    dark: "bg-black/70",
  };

  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={img}
        alt="Modern house exterior"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 transition-colors duration-300",
          overlay && overlayClassMap[overlayOpacity]
        )}
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full">
        <div className="flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {h1Up}
            <br />
            {h1Down}
          </h1>

          {/* CTA Buttons */}
          {rightButton && leftButton && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild variant={"hijau"}>
                <a href="#projects">{leftButton}</a>
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
                  {rightButton}
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
