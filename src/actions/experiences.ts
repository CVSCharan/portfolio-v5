"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function createExperience(data: {
  title: string;
  company: string;
  period: string;
  description: string | null;
}) {
  await db.orm.public.Experience.create(data);
  revalidatePath("/admin");
  revalidatePath("/admin/experiences");
  revalidatePath("/experience");
  revalidatePath("/");
}

export async function updateExperience(id: number, data: {
  title?: string;
  company?: string;
  period?: string;
  description?: string | null;
}) {
  await db.orm.public.Experience.where({ id }).update(data);
  revalidatePath("/admin");
  revalidatePath("/admin/experiences");
  revalidatePath("/experience");
  revalidatePath("/");
}

export async function deleteExperience(id: number) {
  await db.orm.public.Experience.where({ id }).delete();
  revalidatePath("/admin");
  revalidatePath("/admin/experiences");
  revalidatePath("/experience");
  revalidatePath("/");
}
