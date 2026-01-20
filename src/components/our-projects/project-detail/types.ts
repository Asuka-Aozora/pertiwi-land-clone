type Surrounding = {
  id: string;
  name: string;
  image_url: string;
  distance_km: number;
  distance_menit: number;
};

type Feature = {
  name: string;
  image_url: string;
};

type HouseType = {
  name: string;
  image_url: string;
};

type Facility = {
  name: string;
  image_url: string;
};

export type ProjectEuy = {
  id: number;
  slug: string;
  status: string;
  name: string;
  priceRange: string;
  location: string;
  fullAddress: string;
  description: string;
  mainImage: string;
  sitePlan: string;
  gallery: string[];
  features: Feature[];
  surroundings: Surrounding[];
  houseTypes: HouseType[];
  facilities: Facility[];
};

export type ModalSource = "gallery" | "houseType" | null;

export type PropsCleanImage = {
  project: ProjectEuy;
  cleanImageUrl?: (url: string) => string;
};
