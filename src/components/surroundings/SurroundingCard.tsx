"use client";

import { useState } from "react";
import { MapPin, Clock, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SurroundingCardProps {
  data: {
    name: string;
    image: string;
    distance_km: number;
    distance_menit: number;
  };
}

export default function SurroundingCard({ data }: SurroundingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="
        font-poppins
        relative overflow-hidden cursor-pointer
        rounded-2xl transition-shadow duration-300 ease-out
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]
        h-[360px]
        w-full max-w-[360px]
      "
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/10 to-transparent" />
      </div>

      {/* Bottom Content Panel */}
      <div
        className={cn(
          `
          absolute left-0 right-0 bottom-0
          bg-linear-to-t from-black/90 via-black/70 to-black/40
          text-white rounded-2xl
          transition-all duration-500 ease-in-out
          `,
          isExpanded ? "h-[50%]" : "h-[90px]"
        )}
      >
        <div className="flex h-full flex-col p-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                {data.name}
              </h3>
            </div>

            <button
              className="
                w-10 h-10 rounded-full
                border border-white/40
                flex items-center justify-center
                hover:bg-white/20 transition
              "
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronUp className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Detail */}
          <div
            className={cn(
              "mt-5 space-y-3 text-sm font-medium text-white/90 transition-opacity duration-300",
              isExpanded ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{data.distance_km} km dari lokasi</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{data.distance_menit} menit perjalanan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
