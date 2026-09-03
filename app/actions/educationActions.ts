"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function getEducation() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  return await db.orm.public.Education.orderBy((e) => e.order.asc()).all();
}

export async function addEducation(data?: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  let coursesArray = data?.courses || [];
  if (typeof data?.courses === "string") {
    coursesArray = data.courses
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  const result = await db.orm.public.Education.create({
    degree: data?.degree || "New Degree",
    institution: data?.institution || "Institution Name",
    period: data?.period || "2023 - 2024",
    description: data?.description || null,
    courses: coursesArray,
    order: data?.order ?? 999,
  });
  revalidatePath("/admin/education");
  return result;
}

export async function updateEducation(id: number, data: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

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
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await db.orm.public.Education.where({ id }).delete();
  revalidatePath("/admin/education");
}

export async function reorderEducation(
  updates: { id: number; order: number }[],
) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  for (const update of updates) {
    await db.orm.public.Education.where({ id: update.id }).update({
      order: update.order,
    });
  }
  revalidatePath("/admin/education");
}
