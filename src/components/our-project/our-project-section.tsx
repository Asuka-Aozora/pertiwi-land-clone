import { Project } from "@/types/project";
import ProjectList from "./project-list";

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Pannakota Colony",
    location: "Soreang, Kab. Bandung",
    status: "ongoing",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    id: 2,
    title: "Rumah Malaya",
    location: "Padalarang, Kab. Bandung Barat",
    status: "ongoing",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
];

export default function OurProjectSection() {
  const handleDetail = (id: number) => {
    console.log("navigate to project:", id);
    // nanti: router.push(`/our-project/${id}`)
  };

  return (
    <section className="bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-7xl space-y-12">
        <header>
          <p className="font-semibold text-blue-600">Pertiwi Land</p>
          <h1 className="text-4xl font-bold">Our Project</h1>
        </header>

        <ProjectList projects={PROJECTS} onDetail={handleDetail} />
      </div>
    </section>
  );
}
