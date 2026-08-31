"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function createProject(data: {
  title: string;
  slug: string;
  description: string | null;
  techStack: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  imageUrl: string | null;
  order: number;
}) {
  await db.orm.public.Project.create(data);
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function updateProject(id: number, data: {
  title?: string;
  slug?: string;
  description?: string | null;
  techStack?: string[];
  githubUrl?: string | null;
  demoUrl?: string | null;
  imageUrl?: string | null;
  order?: number;
}) {
  await db.orm.public.Project.where({ id }).update(data);
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function deleteProject(id: number) {
  await db.orm.public.Project.where({ id }).delete();
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}
