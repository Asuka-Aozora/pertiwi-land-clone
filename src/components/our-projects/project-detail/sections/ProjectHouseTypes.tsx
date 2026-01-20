import { useState } from "react";
import { ModalSource, PropsCleanImage } from "../types";
import ModalGallery from "./gallery/ModalGallery";

const ProjectHouseTypes = ({ project }: PropsCleanImage) => {
  const [modalSource, setModalSource] = useState<ModalSource>(null);
  const [modalImages, setModalImages] = useState<string[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const houseTypeImages = project.houseTypes.map((type) =>
    type.image_url
  );

  return (
    <>
      <div className="mb-12">
        {" "}
        <h2 className="text-3xl font-bold text-gray-900 mb-6"> House Type </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {project.houseTypes.map((type, index) => (
            <div
              key={index}
              onClick={() => {
                setModalImages(houseTypeImages);
                setActiveIndex(index);
                setModalSource("houseType");
                setIsModalOpen(true);
              }}
              className="
            group relative overflow-hidden cursor-pointer
            rounded-md  
            h-[450px]
    
            w-full max-w-[200px] mx-auto
    
            transition-all duration-300 ease-out
            hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)]
          "
            >
              {/* Image */}
              <img
                src={type.image_url}
                alt={type.name}
                className="
              absolute inset-0
              w-full h-full object-fill
              transition-transform duration-500 ease-out
              group-hover:scale-[1.06]
            "
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/20 to-transparent" />

              {/* Name */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white tracking-tight">
                  {type.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && modalImages.length > 0 && (
        <ModalGallery
          images={modalImages}
          index={activeIndex}
          onClose={() => {
            setIsModalOpen(false);
            setModalSource(null);
            setModalImages([]);
          }}
          onChange={setActiveIndex}
        />
      )}
    </>
  );
};

export default ProjectHouseTypes;
