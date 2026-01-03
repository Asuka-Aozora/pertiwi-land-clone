"use client";
import React from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  location: string;
  status: string;
  image: string;
  slug: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const statusColor =
    project.status.toLowerCase() === "available"
      ? "bg-green-500"
      : "bg-red-500";

  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 cursor-pointer">
        {/* Image Container */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`${statusColor} text-white px-4 py-2 rounded-full text-sm font-medium`}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {project.title}
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

const OurProjectSection = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Tipe Halimun",
      location: "Cihanjuang, Bandung Barat",
      status: "Available",
      slug: "tipe-halimun",
      image: "/projek-property/tipe-halimun/hero.JPG",
    },
    {
      id: 2,
      title: "Type Teduh",
      location: "Cihanjuang, Bandung Barat",
      status: "Available",
      slug: "tipe-teduh",
      image:
        "/projek-property/tipe-teduh/hero.jpeg",
    },
    {
      id: 3,
      title: "Type Teras",
      location: "Cihanjuang, Bandung Barat",
      status: "Available",
      slug: "tipe-teras",
      image:
        "/projek-property/tipe-teras/hero.jpeg",
    },
    {
      id: 4,
      title: "Type Giri",
      location: "Cihanjuang, Bandung Barat",
      status: "Ongoing",
      slug: "tipe-giri",
      image:
        "/projek-property/tipe-giri/hero.jpeg",
    },
    {
      id: 5,
      title: "Type Janari",
      location: "Cihanjuang, Bandung Barat",
      status: "Ongoing",
      slug: "tipe-janari",
      image:
        "/projek-property/tipe-janari/hero.jpeg",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-blue-600 font-semibold text-lg mb-2">
            Teras Land
          </p>
          <h1 className="text-5xl font-bold text-gray-900">Our Project</h1>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProjectSection;
