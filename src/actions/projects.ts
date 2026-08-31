"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  description: z.string().nullable().optional(),
  techStack: z.array(z.string()).min(1).max(10),
  githubUrl: z.string().url().nullable().optional(),
  demoUrl: z.string().url().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  order: z.number().int().min(0).default(0),
});

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
  const validated = projectSchema.parse(data);
  await db.orm.public.Project.create(validated);
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
  const validated = projectSchema.partial().parse(data);
  await db.orm.public.Project.where({ id }).update(validated);
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