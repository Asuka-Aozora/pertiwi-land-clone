import Image from "next/image";
import { PropsCleanImage } from "../types";

const ProjectSitePlan = ({ project }: PropsCleanImage) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Site Plan</h2>
      <div className="bg-gray-100 rounded-2xl p-8 relative h-[500px] md:h-[1800px]">
        <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-xl relative">
          <Image
            src={project.sitePlan}
            alt="Site Plan"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectSitePlan;
