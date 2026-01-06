"use client";

import { ProjectGalleryContainer } from "./sections/gallery/ProjectGallery.container";
import { ProjectEuy } from "./types";
import ProjectHeader from "./sections/ProjectHeader";
import ProjectLocation from "./sections/ProjectLocation";
import ProjectDescription from "./sections/ProjectDescription";
import ProjectFeatures from "./sections/ProjectFeatures";
import ProjectSurroundings from "./sections/ProjectSurroundings";
import ProjectHouseTypes from "./sections/ProjectHouseTypes";
import ProjectSitePlan from "./sections/ProjectSitePlan";
import ProjectFasum from "./sections/ProjectFasum";


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
          <ProjectFeatures project={project} cleanImageUrl={cleanImageUrl} />
        )}

        {/* Sekitar Project */}
        {project.surroundings?.length > 0 && (
          <ProjectSurroundings project={project} />
        )}

        {/* House Type */}
        <ProjectHouseTypes project={project} cleanImageUrl={cleanImageUrl} />

        {/* Site Plan */}
        <ProjectSitePlan project={project} cleanImageUrl={cleanImageUrl} />

        {/* City View and Fasum */}
        {project.facilities && project.facilities.length > 0 && (
          <ProjectFasum project={project} cleanImageUrl={cleanImageUrl} />
        )}
      </section>
    </div>
  );
};

export default ProjectDetailPage;
