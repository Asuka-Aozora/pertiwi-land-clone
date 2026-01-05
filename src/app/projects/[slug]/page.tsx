import { ContactFormSection } from "@/components/home/contact-form-section";
// import { Footer } from "@/components/layout/footer";
import ProjectDetailPage from "@/components/our-projects/project-detail/ProjectDetailPage";
export const dynamicParams = false;

// 1. Definisikan tipe untuk data project
type Surrounding = {
  id: string;
  name: string;
  image: string;
  distance_km: number;
  distance_menit: number;
};

type Feature = {
  name: string;
  image: string;
};

type HouseType = {
  name: string;
  image: string;
};

type Facility = {
  name: string;
  image: string;
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

// 2. Perbaiki definisi projectsData dengan tipe yang sesuai
const projectsData: Record<string, ProjectEuy> = {
  "tipe-halimun": {
    id: 1,
    slug: "tipe-halimun",
    status: "available",
    name: "Type Halimun",
    priceRange: "750 Juta",
    location: "Bukit teras cihanjuang",
    fullAddress: "Kec. Cihanjuang, Kabupaten Bandung Barat, Jawa Barat",
    description:
      "Type Halimun adalah hunian 2 lantai bergaya minimalis modern dengan tata ruang efisien, pencahayaan alami maksimal, dan fasad yang elegan. Lantai 1 terdiri dari ruang tamu dan keluarga, dapur compact, 1 kamar tidur, 1 kamar mandi, serta carport 1 mobil dengan sentuhan ruang hijau. Lantai 2 dilengkapi 2 kamar tidur, 1 kamar mandi, dan balkon depan. Dengan desain fungsional dan lingkungan yang tertata, Type Halimun cocok untuk hunian keluarga maupun investasi jangka panjang.",
    mainImage: "/projek-property/tipe-halimun/hero.JPG",
    gallery: [
      "/projek-property/tipe-halimun/IMG_3033.JPG",
      "/projek-property/tipe-halimun/IMG_3036.JPG",
      "/projek-property/tipe-halimun/IMG_3042.JPG",
      "/projek-property/tipe-halimun/IMG_3046.JPG",
      "/projek-property/tipe-halimun/IMG_3050.JPG",
      "/projek-property/tipe-halimun/IMG_3061.JPG",
      "/projek-property/tipe-halimun/IMG_3063.JPG",
      "/projek-property/tipe-halimun/IMG_3065.JPG",
      "/projek-property/tipe-halimun/IMG_3067.JPG",
    ],
    features: [
      {
        name: "Carport Luas",
        image: "/projek-property/tipe-halimun/fitur/carport-luas.JPG",
      },
      {
        name: "City View",
        image: "/projek-property/tipe-halimun/fitur/city-view.jpeg",
      },
      {
        name: "Design Modern",
        image: "/projek-property/tipe-halimun/fitur/design-modern.JPG",
      },
      {
        name: "Open Space",
        image: "/projek-property/tipe-halimun/fitur/open-space.JPG",
      },
    ],
    surroundings: [
      {
        id: "1",
        name: "Gerbang Tol Baros",
        image: "/projek-property/fasilitas/gerbang-tol-baros.png",
        distance_km: 1.5,
        distance_menit: 34,
      },
      {
        id: "2",
        name: "Politeknik Negeri Bandung",
        image: "/projek-property/fasilitas/kampus-polband.jpeg",
        distance_km: 5,
        distance_menit: 14,
      },
      {
        id: "3",
        name: "Kampus UPI Bandung",
        image: "/projek-property/fasilitas/UPI.jpg",
        distance_km: 7.6,
        distance_menit: 19,
      },
    ],
    houseTypes: [
      {
        name: "Tipe 50",
        image: "/projek-property/tipe-halimun/house-tipe.png",
      },
      {
        name: "Tipe 50 lantai 2",
        image: "/projek-property/tipe-halimun/house-tipe-lantai-2.png",
      },
    ],
    sitePlan: "/projek-property/site-plan.jpg",
    facilities: [
      {
        name: "City View",
        image: "/projek-property/city-view.png",
      },
      {
        name: "Fasilitas Umum",
        image: "/projek-property/fasos.jpeg",
      },
    ],
  },
  "tipe-teduh": {
    id: 2,
    slug: "tipe-teduh",
    status: "available",
    name: "Type Teduh",
    priceRange: "650 Juta",
    location: "Bukit teras cihanjuang",
    fullAddress: "Kec. Cihanjuang, Kabupaten Bandung Barat, Jawa Barat",
    description:
      "Type Teduh adalah hunian minimalis modern dengan tata ruang efisien dan suasana nyaman. Lantai utama terdiri dari ruang tamu dan keluarga, dapur compact, 2 kamar tidur, 1 kamar mandi, serta carport 1 mobil. Dilengkapi area mezzanine multifungsi yang dapat digunakan sebagai ruang kerja atau ruang santai. Cocok sebagai hunian pertama maupun investasi jangka panjang.",
    mainImage: "/projek-property/tipe-teduh/hero.jpeg",
    gallery: [
      "/projek-property/tipe-teduh/galeri.jpeg",
      "/projek-property/tipe-teduh/galeri2.jpeg",
      "/projek-property/tipe-teduh/gallery8.JPG",
      "/projek-property/tipe-teduh/gallery7.JPG",
      "/projek-property/tipe-teduh/galeri3.jpeg",
      "/projek-property/tipe-teduh/galeri5.jpeg",
      "/projek-property/tipe-teduh/gallery3.jpeg",
      "/projek-property/tipe-teduh/gallery4.jpeg",
      "/projek-property/tipe-teduh/gallery5.jpeg",
    ],
    features: [
      {
        name: "Carport Luas",
        image: "/projek-property/tipe-halimun/fitur/carport-luas.JPG",
      },
      {
        name: "City View",
        image: "/projek-property/tipe-halimun/fitur/city-view.jpeg",
      },
      {
        name: "Design Modern",
        image: "/projek-property/tipe-halimun/fitur/design-modern.JPG",
      },
      {
        name: "Open Space",
        image: "/projek-property/tipe-teduh/galeri2.jpeg",
      },
    ],
    surroundings: [
      {
        id: "1",
        name: "Gerbang Tol Baros",
        image: "/projek-property/fasilitas/gerbang-tol-baros.png",
        distance_km: 1.5,
        distance_menit: 34,
      },
      {
        id: "2",
        name: "Politeknik Negeri Bandung",
        image: "/projek-property/fasilitas/kampus-polband.jpeg",
        distance_km: 5,
        distance_menit: 14,
      },
      {
        id: "3",
        name: "Kampus UPI Bandung",
        image: "/projek-property/fasilitas/UPI.jpg",
        distance_km: 7.6,
        distance_menit: 19,
      },
    ],
    houseTypes: [
      {
        name: "Tipe 45",
        image: "/projek-property/tipe-teduh/tipe-45.png",
      },
      {
        name: "Tipe 45 lantai 2",
        image: "/projek-property/tipe-teduh/tipe-45-2.jpg",
      },
    ],
    sitePlan: "/projek-property/site-plan.jpg",
    facilities: [
      {
        name: "City View",
        image: "/projek-property/city-view.png",
      },
      {
        name: "Fasilitas Umum",
        image: "/projek-property/fasos.jpeg",
      },
    ],
  },
  "tipe-teras": {
    id: 3,
    slug: "tipe-teras",
    status: "available",
    name: "Type Teras",
    priceRange: "550 Juta",
    location: "Bukit teras cihanjuang",
    fullAddress: "Kec. Cihanjuang, Kabupaten Bandung Barat, Jawa Barat",
    description:
      "Type Teras adalah hunian 1 lantai bergaya minimalis modern yang dirancang praktis dan nyaman untuk kebutuhan sehari-hari. Terdiri dari 2 kamar tidur, 1 kamar mandi, ruang tamu dan keluarga, serta dapur compact dengan sirkulasi udara yang baik. Dilengkapi carport 1 mobil dan area hijau depan yang menambah kesan asri. Cocok sebagai hunian pertama maupun investasi properti dengan nilai yang terus berkembang.",
    mainImage: "/projek-property/tipe-teras/hero.jpeg",
    gallery: [
      "/projek-property/tipe-teras/gallery.jpeg",
      "/projek-property/tipe-teras/gallery2.jpeg",
      "/projek-property/tipe-teras/gallery3.jpeg",
      "/projek-property/tipe-teras/gallery4.jpeg",
      "/projek-property/tipe-teras/gallery5.jpeg",
      "/projek-property/tipe-teras/gallery6.jpeg",
      "/projek-property/tipe-teras/gallery10.jpeg",
      "/projek-property/tipe-teras/gallery8.jpeg",
      "/projek-property/tipe-teras/gallery9.jpeg",
    ],
    features: [
      {
        name: "Carport Luas",
        image: "/projek-property/tipe-halimun/fitur/carport-luas.JPG",
      },
      {
        name: "City View",
        image: "/projek-property/tipe-halimun/fitur/city-view.jpeg",
      },
      {
        name: "Design Modern",
        image: "/projek-property/tipe-halimun/fitur/design-modern.JPG",
      },
      {
        name: "Open Space",
        image: "/projek-property/tipe-teras/gallery.jpeg",
      },
    ],
    surroundings: [
      {
        id: "1",
        name: "Gerbang Tol Baros",
        image: "/projek-property/fasilitas/gerbang-tol-baros.png",
        distance_km: 1.5,
        distance_menit: 34,
      },
      {
        id: "2",
        name: "Politeknik Negeri Bandung",
        image: "/projek-property/fasilitas/kampus-polband.jpeg",
        distance_km: 5,
        distance_menit: 14,
      },
      {
        id: "3",
        name: "Kampus UPI Bandung",
        image: "/projek-property/fasilitas/UPI.jpg",
        distance_km: 7.6,
        distance_menit: 19,
      },
    ],
    houseTypes: [
      {
        name: "Tipe 36",
        image: "/projek-property/tipe-teras/tipe-teras.jpeg",
      },
    ],
    sitePlan: "/projek-property/site-plan.jpg",
    facilities: [
      {
        name: "City View",
        image: "/projek-property/city-view.png",
      },
      {
        name: "Fasilitas Umum",
        image: "/projek-property/fasos.jpeg",
      },
    ],
  },
  "tipe-giri": {
    id: 4,
    slug: "tipe-giri",
    status: "ongoing",
    name: "Type Giri",
    priceRange: "450 Juta",
    location: "Bukit teras cihanjuang",
    fullAddress: "Kec. Cihanjuang, Kabupaten Bandung Barat, Jawa Barat",
    description:
      "Type Giri adalah hunian 2 lantai bergaya minimalis modern yang dirancang dengan tata ruang fungsional dan nyaman. Lantai 1 terdiri dari ruang tamu dan keluarga, dapur, 1 kamar tidur, 1 kamar mandi, serta carport 1 mobil. Lantai 2 dilengkapi 2 kamar tidur dan 1 kamar mandi, dengan pencahayaan serta sirkulasi udara yang optimal. Cocok untuk hunian keluarga muda maupun investasi jangka panjang.",
    mainImage: "/projek-property/tipe-giri/hero.jpeg",
    gallery: [
      "/projek-property/tipe-giri/gallery.png",
      "/projek-property/tipe-giri/gallery2.png",
      "/projek-property/tipe-giri/gallery3.png",
      "/projek-property/tipe-giri/gallery4.png",
      "/projek-property/tipe-giri/gallery5.jpeg",
      "/projek-property/tipe-giri/gallery6.jpeg",
      "/projek-property/tipe-giri/gallery7.jpeg",
      "/projek-property/tipe-giri/gallery8.jpeg",
      "/projek-property/tipe-giri/gallery9.jpeg",
    ],
    features: [
      {
        name: "Carport Luas",
        image: "/projek-property/tipe-halimun/fitur/carport-luas.JPG",
      },
      {
        name: "City View",
        image: "/projek-property/tipe-halimun/fitur/city-view.jpeg",
      },
      {
        name: "Design Modern",
        image: "/projek-property/tipe-halimun/fitur/design-modern.JPG",
      },
      {
        name: "Open Space",
        image: "/projek-property/tipe-giri/gallery9.jpeg",
      },
    ],
    surroundings: [
      {
        id: "1",
        name: "Gerbang Tol Baros",
        image: "/projek-property/fasilitas/gerbang-tol-baros.png",
        distance_km: 1.5,
        distance_menit: 34,
      },
      {
        id: "2",
        name: "Politeknik Negeri Bandung",
        image: "/projek-property/fasilitas/kampus-polband.jpeg",
        distance_km: 5,
        distance_menit: 14,
      },
      {
        id: "3",
        name: "Kampus UPI Bandung",
        image: "/projek-property/fasilitas/UPI.jpg",
        distance_km: 7.6,
        distance_menit: 19,
      },
    ],
    houseTypes: [
      {
        name: "Tipe 40",
        image: "/projek-property/tipe-giri/tipe-giri.jpeg",
      },
      {
        name: "Tipe 40 lantai 2",
        image: "/projek-property/tipe-giri/tipe-giri-2.jpeg",
      },
    ],
    sitePlan: "/projek-property/site-plan.jpg",
    facilities: [
      {
        name: "City View",
        image: "/projek-property/city-view.png",
      },
      {
        name: "Fasilitas Umum",
        image: "/projek-property/fasos.jpeg",
      },
    ],
  },
  "tipe-janari": {
    id: 5,
    slug: "tipe-janari",
    status: "ongoing",
    name: "Type Janari",
    priceRange: "350 Juta",
    location: "Bukit teras cihanjuang",
    fullAddress: "Kec. Cihanjuang, Kabupaten Bandung Barat, Jawa Barat",
    description:
      "Tipe Janari adalah hunian satu lantai dengan desain compact dan fungsional, dilengkapi area hijau di tengah rumah untuk pencahayaan dan sirkulasi udara alami. Terdiri dari living room yang nyaman, dapur praktis, 1 kamar tidur, 1 kamar mandi, area servis, serta carport yang cukup luas. Cocok untuk keluarga kecil maupun sebagai hunian investasi.",
    mainImage: "/projek-property/tipe-janari/hero.jpeg",
    gallery: [
      "/projek-property/tipe-janari/gallery.png",
      "/projek-property/tipe-janari/gallery2.png",
      "/projek-property/tipe-giri/gallery3.png",
      "/projek-property/tipe-janari/gallery3.png",
    ],
    features: [
      {
        name: "Carport Luas",
        image: "/projek-property/tipe-halimun/fitur/carport-luas.JPG",
      },
      {
        name: "City View",
        image: "/projek-property/tipe-halimun/fitur/city-view.jpeg",
      },
      {
        name: "Design Modern",
        image: "/projek-property/tipe-halimun/fitur/design-modern.JPG",
      },
      {
        name: "Open Space",
        image: "/projek-property/tipe-janari/gallery3.png",
      },
    ],
    surroundings: [
      {
        id: "1",
        name: "Gerbang Tol Baros",
        image: "/projek-property/fasilitas/gerbang-tol-baros.png",
        distance_km: 1.5,
        distance_menit: 34,
      },
      {
        id: "2",
        name: "Politeknik Negeri Bandung",
        image: "/projek-property/fasilitas/kampus-polband.jpeg",
        distance_km: 5,
        distance_menit: 14,
      },
      {
        id: "3",
        name: "Kampus UPI Bandung",
        image: "/projek-property/fasilitas/UPI.jpg",
        distance_km: 7.6,
        distance_menit: 19,
      },
    ],
    houseTypes: [
      {
        name: "Tipe 30",
        image: "/projek-property/tipe-janari/tipe-janari.jpeg",
      },
    ],
    sitePlan: "/projek-property/site-plan.jpg",
    facilities: [
      {
        name: "City View",
        image: "/projek-property/city-view.png",
      },
      {
        name: "Fasilitas Umum",
        image: "/projek-property/fasos.jpeg",
      },
    ],
  },
};

// Generate static params untuk build time (optional)
export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  // 4. Gunakan type assertion yang lebih aman
  const project = projectsData[params.slug as keyof typeof projectsData];

  // Handle 404 jika project tidak ditemukan
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <a href="/projects" className="text-blue-600 hover:underline">
            Back to Projects
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProjectDetailPage project={project} />
      <ContactFormSection />
    </>
  );
}
