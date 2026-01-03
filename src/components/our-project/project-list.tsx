import ProjectCard from "./project-card";
import { Project } from "@/types/project";

type Props = {
  projects: Project[];
  onDetail: (id: number) => void;
};

export default function ProjectList({ projects, onDetail }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onDetail={onDetail} />
      ))}
    </div>
  );
}
