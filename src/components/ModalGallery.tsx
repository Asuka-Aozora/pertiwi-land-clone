"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";

interface ModalGalleryProps {
  images: string[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}

export default function ModalGallery({
  images,
  index,
  onClose,
  onChange,
}: ModalGalleryProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const startX = useRef(0);

  // ESC close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const changeImage = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= images.length) return;
    setAnimating(true);
    setTimeout(() => {
      onChange(nextIndex);
      setAnimating(false);
    }, 150);
  };

  const next = () => changeImage(index + 1);
  const prev = () => changeImage(index - 1);

  // Swipe
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 60) next();
    if (diff < -60) prev();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute z-100 top-6 right-6 text-gray-600 hover:text-black hover:scale-110 transition"
      >
        <X size={28} />
      </button>

      {/* FULLSCREEN */}
      <button
        onClick={() => setFullscreen(!fullscreen)}
        className="absolute z-100 top-6 left-6 text-gray-600 hover:text-black hover:scale-110 transition"
      >
        {fullscreen ? <Minimize size={26} /> : <Maximize size={26} />}
      </button>

      {/* PREV */}
      {index > 0 && (
        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-100
          text-gray-600 hover:text-black hover:scale-125 transition"
        >
          <ChevronLeft size={42} />
        </button>
      )}

      {/* IMAGE */}
      <div
        className="overflow-hidden relative"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={images[index]}
          className={`
            object-contain transition-all duration-500 ease-in-out pointer-events-none
            ${animating ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}
            ${fullscreen ? "w-screen h-screen" : "max-w-[90vw] max-h-[85vh]"}
          `}
        />
      </div>

      {/* NEXT */}
      {index < images.length - 1 && (
        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 
          text-gray-600 hover:text-black hover:scale-125 transition"
        >
          <ChevronRight size={42} />
        </button>
      )}
    </div>
  );
}
