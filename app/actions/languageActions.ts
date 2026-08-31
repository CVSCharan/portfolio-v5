"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function getLanguages() {
  return await db.orm.public.Language.orderBy((l) => l.order.asc()).all();
}

export async function addLanguage() {
  const result = await db.orm.public.Language.create({
    title: "New Language",
    proficiency: "Native",
    additionalInfo: null,
    extraDetails: null,
    highlights: [],
    order: 999,
  });
  revalidatePath("/admin/languages");
  return result;
}

export async function updateLanguage(id: number, data: any) {
  let highlightsArray = data.highlights;
  if (typeof data.highlights === "string") {
    highlightsArray = data.highlights
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  await db.orm.public.Language.where({ id }).update({
    title: data.title,
    proficiency: data.proficiency,
    additionalInfo: data.additionalInfo || null,
    extraDetails: data.extraDetails || null,
    highlights: highlightsArray,
  });
  revalidatePath("/admin/languages");
}

export async function deleteLanguage(id: number) {
  await db.orm.public.Language.where({ id }).delete();
  revalidatePath("/admin/languages");
}

export async function reorderLanguages(
  updates: { id: number; order: number }[],
) {
  for (const update of updates) {
    await db.orm.public.Language.where({ id: update.id }).update({
      order: update.order,
    });
  }
  revalidatePath("/admin/languages");
}
