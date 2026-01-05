"use client";

import React, { useState } from "react";
import {
  MapPin,
  Heart,
  ShoppingCart,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ModalGallery from "../../common/ModalGallery";
import SurroundingsGrid from "../../surroundings/SurroundingGrid";
import Link from "next/link";
import { ProjectEuy } from "@/app/projects/[slug]/page";

type ModalSource = "gallery" | "houseType" | null;

const ProjectDetailPage = ({ project }: { project: ProjectEuy }) => {
  const [modalSource, setModalSource] = useState<ModalSource>(null);
  const [modalImages, setModalImages] = useState<string[]>([]);

  const [slideIndex, setSlideIndex] = useState(0);
  const totalSlides = Math.ceil((project.gallery.length + 1) / 5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [project.mainImage, ...project.gallery];

  const cleanImageUrl = (url: string) => url.trim();

  const houseTypeImages = project.houseTypes.map((type) =>
    cleanImageUrl(type.image)
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-2xl font-bold text-gray-900">
              Harga <span className="text-blue-600">{project.priceRange}</span>
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative overflow-hidden mb-8">
          {/* SLIDER */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${slideIndex * 100}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slide) => {
              const start = slide * 5;
              const bigImage =
                slide === 0 ? project.mainImage : project.gallery[start - 1];

              const thumbs =
                slide === 0
                  ? project.gallery.slice(0, 4)
                  : project.gallery.slice(start, start + 4);

              return (
                <div
                  key={slide}
                  className="min-w-full grid grid-cols-1 lg:grid-cols-2 gap-2 px-1  "
                >
                  {/* BIG IMAGE – 50% */}
                  <div
                    className="relative rounded-sm overflow-hidden group cursor-pointer"
                    onClick={() => {
                      setModalImages(images.map(cleanImageUrl));
                      setActiveIndex(slide === 0 ? 0 : start);
                      setModalSource("gallery");
                      setIsModalOpen(true);
                    }}
                  >
                    <img
                      src={cleanImageUrl(bigImage)}
                      className="w-full h-96 lg:h-[680px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />

                    {/* overlay */}
                    <div
                      className="
                      absolute inset-0
                      bg-black/0
                      group-hover:bg-black/30
                      transition-colors duration-300
                    "
                    />
                  </div>

                  {/* THUMB GRID – 50% */}
                  <div className="grid grid-cols-2 grid-rows-2 gap-2 h-96 lg:h-[680px]">
                    {thumbs.map((img, i) => (
                      <div
                        key={i}
                        className="relative overflow-hidden rounded-sm group cursor-pointer"
                        onClick={() => {
                          setModalImages(images.map(cleanImageUrl));
                          setActiveIndex(slide === 0 ? i + 1 : start + i);
                          setModalSource("gallery");
                          setIsModalOpen(true);
                        }}
                      >
                        <img
                          src={cleanImageUrl(img)}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                        />

                        <div
                          className="
      absolute inset-0
      bg-black/0
      group-hover:bg-black/25
      transition-colors duration-300
    "
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* LEFT ARROW */}
          {slideIndex > 0 && (
            <button
              onClick={() => setSlideIndex((i) => i - 1)}
              className="group absolute left-4 top-1/2 -translate-y-1/2 
        bg-white/70 backdrop-blur 
        p-3 rounded-full shadow-md
        hover:bg-white hover:scale-110 hover:shadow-xl
        transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800 group-hover:text-black" />
            </button>
          )}

          {/* RIGHT ARROW */}
          {slideIndex < totalSlides - 1 && (
            <button
              onClick={() => setSlideIndex((i) => i + 1)}
              className="group absolute right-4 top-1/2 -translate-y-1/2 
        bg-white/70 backdrop-blur 
        p-3 rounded-full shadow-md
        hover:bg-white hover:scale-110 hover:shadow-xl
        transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 text-gray-800 group-hover:text-black" />
            </button>
          )}
        </div>

        {/* Location Info */}
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

        {/* Description */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {project.name}
          </h2>
          <p className="text-gray-600 leading-relaxed">{project.description}</p>
        </div>

        {/* Fitur Rumah */}
        {project.features && project.features.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Fitur Rumah
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer"
                >
                  <img
                    src={cleanImageUrl(feature.image)}
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
        )}

        {/* Sekitar Project */}
        {project.surroundings?.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Sekitar {project.name}
            </h2>

            <SurroundingsGrid data={project.surroundings} />
          </section>
        )}

        {/* House Type */}
        <div className="mb-12">
          {" "}
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {" "}
            House Type{" "}
          </h2>
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
                  src={cleanImageUrl(type.image)}
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

        {/* Site Plan */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Site Plan</h2>
          <div className="bg-gray-100 rounded-2xl p-8 relative">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-xl">
              <img
                src={cleanImageUrl(project.sitePlan)}
                alt="Site Plan"
                className="w-full h-full object-cover"
              />
            </div>
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

        {/* Fasos dan Fasum */}
        {project.facilities && project.facilities.length > 0 && (
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
                    src={cleanImageUrl(facility.image)}
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
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
