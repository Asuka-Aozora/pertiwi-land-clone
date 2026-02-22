"use client";
import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/types/database.types";

const ProjectCard = ({ project }: { project: Project }) => {
  const statusColor =
    project.status.toLowerCase() === "available"
      ? "bg-green-500"
      : "bg-red-500";

  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 cursor-pointer">
        {/* Image Container */}
        <div className="relative h-72 overflow-hidden bg-gray-200">
          {project.main_image ? (
            <Image
              src={project.main_image}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <span className="text-sm">No Image Available</span>
            </div>
          )}
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`${statusColor} text-white px-4 py-2 rounded-full text-sm font-medium capitalize`}
            >
              {project.status.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {project.name}
            </h3>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{project.location}</span>
            </div>
          </div>

          {/* Detail Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/projects/${project.slug}`;
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200 ml-4"
          >
            See Detail
          </button>
        </div>
      </div>
    </Link>
  );
};

interface OurProjectSectionProps {
  projects: Project[];
}

const OurProjectSection = ({ projects }: OurProjectSectionProps) => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-blue-600 font-semibold text-lg mb-2">Teras Land</p>
          <h1 className="text-5xl font-bold text-gray-900">Our Project</h1>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProjectSection;
