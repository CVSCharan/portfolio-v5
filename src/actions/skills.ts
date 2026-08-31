"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function createSkill(data: {
  name: string;
  level: number;
  category: string;
}) {
  await db.orm.public.Skill.create(data);
  revalidatePath("/admin");
  revalidatePath("/admin/skills");
  revalidatePath("/skills");
  revalidatePath("/");
}

export async function updateSkill(id: number, data: {
  name?: string;
  level?: number;
  category?: string;
}) {
  await db.orm.public.Skill.where({ id }).update(data);
  revalidatePath("/admin");
  revalidatePath("/admin/skills");
  revalidatePath("/skills");
  revalidatePath("/");
}

export async function deleteSkill(id: number) {
  await db.orm.public.Skill.where({ id }).delete();
  revalidatePath("/admin");
  revalidatePath("/admin/skills");
  revalidatePath("/skills");
  revalidatePath("/");
}
