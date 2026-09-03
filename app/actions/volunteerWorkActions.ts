"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function getVolunteerWork() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  return await db.orm.public.VolunteerWork.orderBy((v) => v.order.asc()).all();
}

export async function addVolunteerWork(data?: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  let highlightsArray = data?.highlights || [];
  if (typeof data?.highlights === "string") {
    highlightsArray = data.highlights
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  const result = await db.orm.public.VolunteerWork.create({
    organization: data?.organization || "New Organization",
    role: data?.role || "Volunteer",
    date: data?.date || "2024 - Present",
    additionalInfo: data?.additionalInfo || null,
    extraDetails: data?.extraDetails || null,
    highlights: highlightsArray,
    order: data?.order ?? 999,
  });
  revalidatePath("/admin/volunteer");
  return result;
}

export async function updateVolunteerWork(id: number, data: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  let highlightsArray = data.highlights;
  if (typeof data.highlights === "string") {
    highlightsArray = data.highlights
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  await db.orm.public.VolunteerWork.where({ id }).update({
    organization: data.organization,
    role: data.role,
    date: data.date || null,
    additionalInfo: data.additionalInfo || null,
    extraDetails: data.extraDetails || null,
    highlights: highlightsArray,
  });
  revalidatePath("/admin/volunteer");
}

export async function deleteVolunteerWork(id: number) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await db.orm.public.VolunteerWork.where({ id }).delete();
  revalidatePath("/admin/volunteer");
}

export async function reorderVolunteerWork(
  updates: { id: number; order: number }[],
) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  for (const update of updates) {
    await db.orm.public.VolunteerWork.where({ id: update.id }).update({
      order: update.order,
    });
  }
  revalidatePath("/admin/volunteer");
}
