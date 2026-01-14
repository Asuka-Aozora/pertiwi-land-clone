"use client";
import { useState } from "react";
import {
  Banknote,
  LandPlot,
  Home,
  ArrowUpNarrowWide,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

import type { Project } from "@/types/database.types";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="
        font-poppins
        relative overflow-hidden cursor-pointer
        rounded-2xl transition-shadow duration-300 ease-out
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]
        h-[420px] sm:h-[400px] md:h-[370px]
        w-full max-w-[340px] sm:max-w-[380px] aspect-4/3
        
      "
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={project.main_image}
          alt={project.name}
          className="w-full h-full object-cover"
        />

        {/* Gradient hitam */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-black/10 to-transparent" />
      </div>

      {/* Bottom Content Panel */}
      <div
        className={`
    absolute left-0 right-0 bottom-0
    bg-linear-to-t from-black/90 via-black/70 to-black/30
    text-white rounded-2xl
    transition-all duration-500 ease-in-out
    ${isExpanded ? "h-[80%]" : "h-[88px]"}
  `}
      >
        <div className="flex h-full flex-col p-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold tracking-tight">
              {project.name}
            </h3>

            <button
              className="
        w-10 h-10 rounded-full
        border border-white/50
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
              <Banknote className="w-4 h-4" />
              <span>{project.price}</span>
            </div>

            <div className="flex items-center gap-2">
              <LandPlot className="w-4 h-4" />
              <span>Luas Tanah {project.land_size}</span>
            </div>

            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Luas Bangunan {project.building_size}</span>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpNarrowWide className="w-4 h-4" />
              <span>{project.floor_count}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectHighlightProps {
  projects: Project[];
}

export default function ProjectHighlight({ projects }: ProjectHighlightProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-16 md:py-14 bg-gray-100 rounded-2xl m-6 ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <p className="text-blue-600 font-semibold mb-2 text-3xl">TerasLand</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Project Highlight
          </h2>
        </div>

        {/* Projects Grid */}
        <div
          className="grid grid-cols-1 gap-6
    place-items-center
    md:grid-cols-2 md:place-items-stretch
    lg:grid-cols-4"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
