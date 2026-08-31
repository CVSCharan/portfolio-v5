"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function getVolunteerWork() {
  return await db.orm.public.VolunteerWork.orderBy((v) => v.order.asc()).all();
}

export async function addVolunteerWork() {
  const result = await db.orm.public.VolunteerWork.create({
    organization: "New Organization",
    role: "Volunteer",
    date: "2024 - Present",
    additionalInfo: null,
    extraDetails: null,
    highlights: [],
    order: 999,
  });
  revalidatePath("/admin/volunteer");
  return result;
}

export async function updateVolunteerWork(id: number, data: any) {
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
  await db.orm.public.VolunteerWork.where({ id }).delete();
  revalidatePath("/admin/volunteer");
}

export async function reorderVolunteerWork(
  updates: { id: number; order: number }[],
) {
  for (const update of updates) {
    await db.orm.public.VolunteerWork.where({ id: update.id }).update({
      order: update.order,
    });
  }
  revalidatePath("/admin/volunteer");
}
