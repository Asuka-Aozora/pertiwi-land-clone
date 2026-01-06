import SurroundingsGrid from "@/components/surroundings/SurroundingGrid";
import { ProjectEuy } from "../types";

const ProjectSurroundings = ({ project }: { project: ProjectEuy }) => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Sekitar {project.name}
      </h2>

      <SurroundingsGrid data={project.surroundings} />
    </section>
  );
};

export default ProjectSurroundings;
