"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  return await db.orm.public.Project.orderBy((p) => p.order.asc()).all();
}

export async function addProject(data?: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  let techStackArray = data?.techStack || [];
  if (typeof data?.techStack === 'string') {
    techStackArray = data.techStack.split(',').map((s: string) => s.trim()).filter(Boolean);
  }

  let highlightsArray = data?.highlights || [];
  if (typeof data?.highlights === 'string') {
    highlightsArray = data.highlights.split(',').map((s: string) => s.trim()).filter(Boolean);
  }

  const result = await db.orm.public.Project.create({
    title: data?.title || 'New Project',
    slug: data?.slug || 'new-project-' + Date.now(),
    description: data?.description || null,
    techStack: techStackArray,
    highlights: highlightsArray,
    githubUrls: data?.githubUrls || null,
    demoUrl: data?.demoUrl || null,
    imageUrl: data?.imageUrl || null,
    order: data?.order ?? 999
  });
  revalidatePath("/admin/projects");
  return result;
}

export async function updateProject(id: number, data: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  let techStackArray = data.techStack;
  if (typeof data.techStack === 'string') {
    techStackArray = data.techStack.split(',').map((s: string) => s.trim()).filter(Boolean);
  }

  let highlightsArray = data.highlights;
  if (typeof data.highlights === 'string') {
    highlightsArray = data.highlights.split(',').map((s: string) => s.trim()).filter(Boolean);
  }

  await db.orm.public.Project.where({ id }).update({
    title: data.title,
    slug: data.slug,
    description: data.description || null,
    techStack: techStackArray,
    highlights: highlightsArray,
    githubUrls: data.githubUrls || null,
    demoUrl: data.demoUrl || null,
    imageUrl: data.imageUrl || null
  });
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: number) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await db.orm.public.Project.where({ id }).delete();
  revalidatePath("/admin/projects");
}

export async function reorderProjects(updates: { id: number; order: number }[]) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  for (const update of updates) {
    await db.orm.public.Project.where({ id: update.id }).update({ order: update.order });
  }
  revalidatePath("/admin/projects");
}

export async function getPaginatedTemplates(skip: number, take: number, tech?: string | null) {
  const plan = db.sql.public.project
    .select(
      "id",
      "title",
      "slug",
      "description",
      "fullDescription",
      "techStack",
      "highlights",
      "githubUrls",
      "demoUrl",
      "imageUrl",
      "category",
      "isActive",
      "isFeatured",
      "order",
      "createdAt"
    )
    .where((f, fns) => {
      if (tech) {
        return fns.and(
          fns.eq(f.isFeatured, false),
          fns.raw`${tech} = ANY(${f.techStack})`.returns("pg/bool@1")
        );
      }
      return fns.eq(f.isFeatured, false);
    })
    .orderBy((f) => f.order, { direction: "asc" })
    .limit(take)
    .offset(skip)
    .build();

  const results = await (db.runtime() as any).query(plan);
  return results as any;
}
