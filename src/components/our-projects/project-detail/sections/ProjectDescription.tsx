import { ProjectEuy } from "../types";

const ProjectDescription = ({ project }: { project: ProjectEuy }) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{project.name}</h2>
      <p className="text-gray-600 leading-relaxed">{project.description}</p>
    </div>
  );
};

export default ProjectDescription;
