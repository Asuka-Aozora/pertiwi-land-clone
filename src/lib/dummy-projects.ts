import type { Project } from "@/types/database.types";

export const dummyFeaturedProjects: Project[] = [
  {
    id: 1,
    slug: "tipe-halimun",
    title: "Type Halimun",
    location: "Cihanjuang, Bandung Barat",
    image_url: "/projek-property/tipe-halimun/hero.JPG",
    display_order: 1,
    created_at: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    slug: "tipe-teduh",
    title: "Type Teduh",
    location: "Cihanjuang, Bandung Barat",
    image_url: "/projek-property/tipe-teduh/hero.jpeg",
    display_order: 2,
    created_at: "2025-01-01T00:00:00.000Z",
  },
];
