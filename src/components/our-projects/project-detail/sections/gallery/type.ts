export type ModalSource = "gallery" | "houseType" | null;

export type Props = {
  images: string;
  gallery: string[];
  slideIndex: number;
  totalSlides: number;
  onImageClick: (slide: number, start: number) => void;
  onSlideChange: (index: number) => void;
};