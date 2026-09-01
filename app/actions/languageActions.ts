"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function getLanguages() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  return await db.orm.public.Language.orderBy((l) => l.order.asc()).all();
}

export async function addLanguage() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

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
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

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
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await db.orm.public.Language.where({ id }).delete();
  revalidatePath("/admin/languages");
}

export async function reorderLanguages(
  updates: { id: number; order: number }[],
) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  for (const update of updates) {
    await db.orm.public.Language.where({ id: update.id }).update({
      order: update.order,
    });
  }
  revalidatePath("/admin/languages");
}
