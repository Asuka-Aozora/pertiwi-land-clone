import { MapPin } from "lucide-react";
import { ProjectEuy } from "../types";
import Link from "next/link";

const ProjectLocation = ({ project }: { project: ProjectEuy }) => {
    if (!project) return null;

  return (
    <div className="bg-gray-50 rounded-2xl p-6 mb-8 flex items-start justify-between">
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {project.location}
        </h3>
        <p className="text-gray-600 mb-1">{project.fullAddress}</p>
      </div>
      <button className="text-blue-600 flex items-center gap-2 hover:underline">
        <MapPin className="w-5 h-5" />
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${project.location}`}
        >
          Lihat Map
        </Link>
      </button>
    </div>
  );
}

export default ProjectLocation