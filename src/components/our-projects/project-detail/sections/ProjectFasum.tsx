import { PropsCleanImage } from "../types";

const ProjectFasum = ({ project, cleanImageUrl }: PropsCleanImage) => {
  return (
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
              src={cleanImageUrl(facility.image_url)}
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
  );
};

export default ProjectFasum;
