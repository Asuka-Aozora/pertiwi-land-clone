import { ProjectEuy } from "../types";

const ProjectHeader = ({ project }: { project: ProjectEuy }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-4xl font-bold text-gray-900">{project.name}</h1>
        <p className="text-2xl font-bold text-gray-900">
          Harga <span className="text-blue-600">{project.priceRange}</span>
        </p>
      </div>
    </div>
  );
}

export default ProjectHeader