"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function getSkills() {
  return await db.orm.public.Skill.orderBy((s) => s.category.asc()).all();
}

export async function addSkill(data: {
  name: string;
  level: number;
  category: string;
}) {
  const result = await db.orm.public.Skill.create(data);
  revalidatePath("/admin/skills");
  return result;
}

export async function updateSkill(
  id: number,
  data: { name: string; level: number; category: string },
) {
  await db.orm.public.Skill.where({ id }).update(data);
  revalidatePath("/admin/skills");
}

export async function deleteSkill(id: number) {
  await db.orm.public.Skill.where({ id }).delete();
  revalidatePath("/admin/skills");
}
