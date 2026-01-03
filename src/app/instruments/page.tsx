import { getProjects } from "../actions/project.action";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <div>
      {projects.map((p) => (
        <div key={p.id}>
          <h2>{p.name}</h2>
          <img src={p.images[0]?.image.publicUrl} alt={p.name} />
        </div>
      ))}
    </div>
  );
}
