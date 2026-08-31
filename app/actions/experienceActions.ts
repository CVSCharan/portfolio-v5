"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function getExperience() {
  return await db.orm.public.Experience.orderBy((e) => e.order.asc()).all();
}

export async function addExperience() {
  const result = await db.orm.public.Experience.create({
    title: "New Role",
    company: "Company Name",
    period: "2023 - Present",
    description: null,
    highlights: [],
    order: 999,
  });
  revalidatePath("/admin/experience");
  return result;
}

export async function updateExperience(id: number, data: any) {
  let highlightsArray = data.highlights;
  if (typeof data.highlights === "string") {
    highlightsArray = data.highlights
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  await db.orm.public.Experience.where({ id }).update({
    title: data.title,
    company: data.company,
    period: data.period,
    description: data.description || null,
    highlights: highlightsArray,
  });
  revalidatePath("/admin/experience");
}

export async function deleteExperience(id: number) {
  await db.orm.public.Experience.where({ id }).delete();
  revalidatePath("/admin/experience");
}

export async function reorderExperience(
  updates: { id: number; order: number }[],
) {
  for (const update of updates) {
    await db.orm.public.Experience.where({ id: update.id }).update({
      order: update.order,
    });
  }
  revalidatePath("/admin/experience");
}
