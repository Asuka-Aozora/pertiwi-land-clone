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

// Dummy data (property types)
const projects = [
  {
    id: 1,
    name: "Type Halimun",
    image: "/about-us/project-highlight/type-halimun.jpg",
    price: "750 Juta",
    landSize: "64 m²",
    buildingSize: "50 m²",
    floor: "2 Lantai",
  },
  {
    id: 2,
    name: "Type Teduh",
    image: "/about-us/project-highlight/type-teduh2.jpg",
    price: "650 Juta",
    landSize: "64 m²",
    buildingSize: "45 m²",
    floor: "Mezzanine",
  },
  {
    id: 3,
    name: "Type Teras",
    image: "/about-us/project-highlight/type-teras.jpg",
    price: "550 Juta",
    landSize: "64 m²",
    buildingSize: "36 m²",
    floor: "1 Lantai",
  },
  {
    id: 4,
    name: "Type Giri",
    image: "/projek-property/tipe-giri/hero.jpeg",
    price: "450 Juta",
    landSize: "52 m²",
    buildingSize: "40 m²",
    floor: "2 Lantai",
  },
];

interface Project {
  id: number;
  name: string;
  image: string;
  price: string;
  landSize: string;
  buildingSize: string;
  floor: string;
}

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
          src={project.image}
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
              <span>Luas Tanah {project.landSize}</span>
            </div>

            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Luas Bangunan {project.buildingSize}</span>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpNarrowWide className="w-4 h-4" />
              <span>{project.floor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectHighlight() {
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
