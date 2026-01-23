import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Props } from "./type";

export const ProjectGalleryView = ({
  images,
  gallery,
  slideIndex,
  totalSlides,
  onImageClick,
  onSlideChange,
}: Props) => {
  const cleanImageUrl = (url: string) => url.trim();
  return (
    <div className="relative overflow-hidden mb-8">
      {/* SLIDER */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${slideIndex * 100}%)`,
        }}
      >
        {Array.from({ length: totalSlides }).map((_, slide) => {
          const start = slide * 5;
          const bigImage = slide === 0 ? images : gallery[start - 1];

          const thumbs =
            slide === 0 ? gallery.slice(0, 4) : gallery.slice(start, start + 4);

          return (
            <div
              key={slide}
              className="min-w-full grid grid-cols-1 lg:grid-cols-2 gap-2 px-1"
            >
              {/* BIG IMAGE – 50% */}
              <div
                className="relative rounded-sm overflow-hidden group cursor-pointer h-96 lg:h-[680px]"
                onClick={() => {
                  onImageClick(slide, start);
                }}
              >
                <Image
                  src={cleanImageUrl(bigImage)}
                  alt="Gallery main image"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  unoptimized
                />

                {/* overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-black/0
                    group-hover:bg-black/30
                    transition-colors duration-300
                  "
                />
              </div>

              {/* THUMB GRID – 50% */}
              <div className="grid grid-cols-2 grid-rows-2 gap-2 h-96 lg:h-[680px]">
                {thumbs.map((img, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-sm group cursor-pointer"
                    onClick={() => {
                      onImageClick(slide, start + i);
                    }}
                  >
                    <Image
                      src={cleanImageUrl(img)}
                      alt={`Gallery thumbnail ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                      unoptimized
                    />

                    <div
                      className="
                        absolute inset-0
                        bg-black/0
                        group-hover:bg-black/25
                        transition-colors duration-300
                      "
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* LEFT ARROW */}
      {slideIndex > 0 && (
        <button
          onClick={() => onSlideChange(slideIndex - 1)}
          className="group absolute left-4 top-1/2 -translate-y-1/2 
          bg-white/70 backdrop-blur 
          p-3 rounded-full shadow-md
          hover:bg-white hover:scale-110 hover:shadow-xl
          transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800 group-hover:text-black" />
        </button>
      )}

      {/* RIGHT ARROW */}
      {slideIndex < totalSlides - 1 && (
        <button
          onClick={() => onSlideChange(slideIndex + 1)}
          className="group absolute right-4 top-1/2 -translate-y-1/2 
          bg-white/70 backdrop-blur 
          p-3 rounded-full shadow-md
          hover:bg-white hover:scale-110 hover:shadow-xl
          transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5 text-gray-800 group-hover:text-black" />
        </button>
      )}
    </div>
  );
};
