import { PropsCleanImage } from "../types";

const ProjectFeatures = ({ project }: PropsCleanImage) => {

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Fitur Rumah</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {project.features.map((feature, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer"
          >
            <img
              src={feature.image_url}
              alt={feature.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
            <p className="absolute bottom-4 left-4 text-white font-semibold text-lg">
              {feature.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectFeatures;
