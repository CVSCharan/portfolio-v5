"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const skillSchema = z.object({
  name: z.string().min(1).max(100),
  level: z.number().int().min(0).max(100),
  category: z.string().min(1).max(50),
});

export async function createSkill(data: {
  name: string;
  level: number;
  category: string;
}) {
  const validated = skillSchema.parse(data);
  await db.orm.public.Skill.create(validated);
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
  const validated = skillSchema.partial().parse(data);
  await db.orm.public.Skill.where({ id }).update(validated);
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