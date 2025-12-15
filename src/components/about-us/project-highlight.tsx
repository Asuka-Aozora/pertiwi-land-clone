"use client"
import { useState } from "react";
import {
  MapPin,
  DollarSign,
  Calendar,
  Building,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

// Dummy data
const projects = [
  {
    id: 1,
    name: "Cluster Eureka",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    location: "Padalarang, Kab. Bandung Barat",
    priceRange: "400 - 810 Mio Rupiah",
    year: "2018 - 2020",
    units: "111 Building Unit",
  },
  {
    id: 2,
    name: "Nevada Downtown",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
    location: "Padalarang, Kab. Bandung Barat",
    priceRange: "400 - 810 Mio Rupiah",
    year: "2018 - 2020",
    units: "111 Building Unit",
    featured: true,
  },
  {
    id: 3,
    name: "Beverly Park",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    location: "Cimahi, Kab. Bandung Barat",
    priceRange: "500 - 900 Mio Rupiah",
    year: "2019 - 2021",
    units: "85 Building Unit",
  },
  {
    id: 4,
    name: "Bandung City Light",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&h=600&fit=crop",
    location: "Bandung, Jawa Barat",
    priceRange: "600 - 1.2 M Rupiah",
    year: "2020 - 2022",
    units: "120 Building Unit",
  },
];

interface Project {
  id: number;
  name: string;
  image: string;
  location: string;
  priceRange: string;
  year: string;
  units: string;
  featured?: boolean;
}


interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer group h-[420px] sm:h-[400px] md:h-[370px] w-full
    max-w-[340px] sm:max-w-[380px] md:max-w-none aspect-3/4"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        {/* Title and Toggle Button */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold">{project.name}</h3>
          <button
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors shrink-0"
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

        {/* Expanded Details */}
        <div
          className={`space-y-2 transition-all duration-400  ${
            isExpanded
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 shrink-0 mt-1" />
            <span className="text-sm">{project.location}</span>
          </div>

          <div className="flex items-start gap-2">
            <DollarSign className="w-4 h-4 shrink-0 mt-1" />
            <span className="text-sm">{project.priceRange}</span>
          </div>

          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 shrink-0 mt-1" />
            <span className="text-sm">{project.year}</span>
          </div>

          <div className="flex items-start gap-2">
            <Building className="w-4 h-4 shrink-0 mt-1" />
            <span className="text-sm">{project.units}</span>
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
