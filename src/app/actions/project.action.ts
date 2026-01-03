"use server";

import prisma from "@/lib/prisma";


export async function getProjects() {
  return await prisma.project.findMany({
    where: {
      status: "ongoing",
    },
    include: {
      images: {
        where: { isPrimary: true },
        include: { image: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProjectBySlug(slug: string) {
  return await prisma.project.findUnique({
    where: { slug },
    include: {
      images: {
        include: { image: true },
        orderBy: { displayOrder: "asc" },
      },
      houseTypes: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}
