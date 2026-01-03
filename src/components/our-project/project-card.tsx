import Image from "next/image";
import { MapPin } from "lucide-react";
import { Project } from "@/types/project";

type Props = {
  project: Project;
  onDetail: (id: number) => void;
};

export default function ProjectCard({ project, onDetail }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition">
      {/* Image */}
      <div className="relative h-72">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />

        <span className="absolute top-4 left-4 rounded-full bg-green-600 px-4 py-1 text-sm text-white">
          {project.status}
        </span>
      </div>

      {/* Content */}
      <div className="flex items-center justify-between p-6">
        <div>
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <div className="mt-1 flex items-center text-sm text-gray-600">
            <MapPin className="mr-1 h-4 w-4" />
            {project.location}
          </div>
        </div>

        <button
          onClick={() => onDetail(project.id)}
          className="rounded-full bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
        >
          Detail
        </button>
      </div>
    </div>
  );
}
