"use client";

import { ProjectEuy } from "@/app/projects/[slug]/page";
import ModalGallery from "./ModalGallery";
import { useState } from "react";
import { ProjectGalleryView } from "./ProjectGallery.view";
import { ModalSource } from "./type";



export const ProjectGalleryContainer = ({
  project,
}: {
  project: ProjectEuy;
}) => {
  const [modalSource, setModalSource] = useState<ModalSource>(null);
  const [modalImages, setModalImages] = useState<string[]>([]);

  const [slideIndex, setSlideIndex] = useState(0);
  const totalSlides = Math.ceil((project.gallery.length + 1) / 5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const gallery = project.gallery;
    const images = project.mainImage;
    const imagesModal = [project.mainImage, ...project.gallery];

  const handleOpenGalleryModal = (slide: number, start: number) => {
    setModalImages(imagesModal);
    setActiveIndex(slide === 0 ? 0 : start);
    setModalSource("gallery");
    setIsModalOpen(true);
  };
    
    const handleSlideChange = (i: number) => {
        setSlideIndex(i);
        
    }
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
