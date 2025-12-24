export type ProjectStatus = "ongoing" | "available" | "sold";

export type Project = {
  id: number;
  title: string;
  location: string;
  image: string;
  status: ProjectStatus;
};
