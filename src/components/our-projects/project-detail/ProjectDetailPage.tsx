"use client";

import React, { useState } from "react";
import ModalGallery from "./sections/gallery/ModalGallery";
import SurroundingsGrid from "../../surroundings/SurroundingGrid";
import { ProjectGalleryContainer } from "./sections/gallery/ProjectGallery.container";
import { ProjectEuy } from "./types";
import ProjectHeader from "./sections/ProjectHeader";
import ProjectLocation from "./sections/ProjectLocation";
import ProjectDescription from "./sections/ProjectDescription";
import ProjectFeatures from "./sections/ProjectFeatures";
import ProjectSurroundings from "./sections/ProjectSurroundings";
import ProjectHouseTypes from "./sections/ProjectHouseTypes";

type ModalSource = "gallery" | "houseType" | null;

const ProjectDetailPage = ({ project }: { project: ProjectEuy }) => {
  const cleanImageUrl = (url: string) => url.trim();


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <ProjectHeader project={project} />

        {/* Image Gallery */}
        <ProjectGalleryContainer project={project} />

        {/* Location Info */}
        <ProjectLocation project={project} />

        {/* Description */}
        <ProjectDescription project={project} />

        {/* Fitur Rumah */}
        {project.features && project.features.length > 0 && (
          <ProjectFeatures project={project} />
        )}

        {/* Sekitar Project */}
        {project.surroundings?.length > 0 && (
          <ProjectSurroundings project={project} />
        )}

        {/* House Type */}
        <ProjectHouseTypes project={project} />

        {/* Site Plan */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Site Plan</h2>
          <div className="bg-gray-100 rounded-2xl p-8 relative">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-xl">
              <img
                src={cleanImageUrl(project.sitePlan)}
                alt="Site Plan"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Fasos dan Fasum */}
        {project.facilities && project.facilities.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              City View dan Fasum
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.facilities.map((facility, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl overflow-hidden h-64 group"
                >
                  <img
                    src={cleanImageUrl(facility.image)}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                  <p className="absolute bottom-6 left-6 text-white font-bold text-2xl">
                    {facility.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProjectDetailPage;
