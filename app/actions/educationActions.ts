"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function getEducation() {
  return await db.orm.public.Education.orderBy((e) => e.order.asc()).all();
}

export async function addEducation() {
  const result = await db.orm.public.Education.create({
    degree: "New Degree",
    institution: "Institution Name",
    period: "2023 - 2024",
    description: null,
    courses: [],
    order: 999,
  });
  revalidatePath("/admin/education");
  return result;
}

export async function updateEducation(id: number, data: any) {
  let coursesArray = data.courses;
  if (typeof data.courses === "string") {
    coursesArray = data.courses
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  await db.orm.public.Education.where({ id }).update({
    degree: data.degree,
    institution: data.institution,
    period: data.period,
    description: data.description || null,
    courses: coursesArray,
  });
  revalidatePath("/admin/education");
}

export async function deleteEducation(id: number) {
  await db.orm.public.Education.where({ id }).delete();
  revalidatePath("/admin/education");
}

export async function reorderEducation(
  updates: { id: number; order: number }[],
) {
  for (const update of updates) {
    await db.orm.public.Education.where({ id: update.id }).update({
      order: update.order,
    });
  }
  revalidatePath("/admin/education");
}
