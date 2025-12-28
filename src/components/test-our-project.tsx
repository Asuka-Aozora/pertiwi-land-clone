"use client"
import React from "react";
import { MapPin } from "lucide-react";

interface Project {
    title: string;
    location: string;
    status: string;
    image: string;
    onDetailClick: (id: number) => void;
}

const ProjectCard = ({ title, location, status, image, onDetailClick }: Project) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            {status}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
        </div>

        {/* Detail Button */}
        <button
          onClick={onDetailClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200 ml-4"
        >
          See Detail
        </button>
      </div>
    </div>
  );
};

const OurProjectSection = () => {
  const projects = [
    {
      id: 1,
      title: "Pannakota Colony",
      location: "Soreang, Kab. Bandung",
      status: "Ongoing",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    },
    {
      id: 2,
      title: "Rumah Malaya",
      location: "Padalarang, Kab. Bandung Barat",
      status: "Ongoing",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    },
    {
      id: 3,
      title: "Green Valley Residence",
      location: "Cimahi, Kab. Bandung",
      status: "Ongoing",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    },
    {
      id: 4,
      title: "Mountain View Estate",
      location: "Lembang, Kab. Bandung Barat",
      status: "Ongoing",
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    },
  ];

  const handleDetailClick = (projectId) => {
    console.log(`Navigate to project detail: ${projectId}`);
    // Add your navigation logic here
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-blue-600 font-semibold text-lg mb-2">
            Pertiwi Land
          </p>
          <h1 className="text-5xl font-bold text-gray-900">Our Project</h1>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              location={project.location}
              status={project.status}
              image={project.image}
              onDetailClick={() => handleDetailClick(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProjectSection;
