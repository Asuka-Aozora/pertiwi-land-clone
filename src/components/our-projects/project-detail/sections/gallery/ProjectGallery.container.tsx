"use client";

import ModalGallery from "./ModalGallery";
import { useState } from "react";
import { ProjectGalleryView } from "./ProjectGallery.view";
import { ModalSource, ProjectEuy } from "../../types";

export const ProjectGalleryContainer = ({
  project,
}: {
  project: ProjectEuy;
}) => {
  const [modalSource, setModalSource] = useState<ModalSource>(null);
  const [modalImages, setModalImages] = useState<string[]>([]);

  const [slideIndex, setSlideIndex] = useState(0);
  const gallery = project.gallery.filter((i) => i && i.trim() !== "");
  const mainImage =
    project.mainImage && project.mainImage.trim() !== ""
      ? project.mainImage
      : null;
  const imagesModal = [mainImage, ...gallery].filter((i): i is string => !!i);

  const images = mainImage ?? ""; // fallback for view prop if needed, though view handles null now
  const totalSlides = Math.ceil((gallery.length + (mainImage ? 1 : 0)) / 5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpenGalleryModal = (slide: number, start: number) => {
    setModalImages(imagesModal);
    setActiveIndex(slide === 0 ? 0 : start);
    setModalSource("gallery");
    setIsModalOpen(true);
  };

  const handleSlideChange = (i: number) => {
    setSlideIndex(i);
  };
  return (
    <>
      <ProjectGalleryView
        images={images}
        gallery={gallery}
        slideIndex={slideIndex}
        totalSlides={totalSlides}
        onImageClick={handleOpenGalleryModal}
        onSlideChange={handleSlideChange}
      />

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
