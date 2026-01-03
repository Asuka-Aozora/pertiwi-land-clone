import SurroundingCard from "./SurroundingCard";
import { Surrounding } from "@/types/surrounding";

interface SurroundingsGridProps {
  data: Surrounding[];
}

export default function SurroundingsGrid({ data }: SurroundingsGridProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <SurroundingCard key={item.id} data={item} />
      ))}
    </div>
  );
}
