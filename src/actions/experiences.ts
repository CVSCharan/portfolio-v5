"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const experienceSchema = z.object({
  title: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  period: z.string().min(1).max(100),
  description: z.string().nullable().optional(),
});

export async function createExperience(data: {
  title: string;
  company: string;
  period: string;
  description: string | null;
}) {
  const validated = experienceSchema.parse(data);
  await db.orm.public.Experience.create(validated);
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
  const validated = experienceSchema.partial().parse(data);
  await db.orm.public.Experience.where({ id }).update(validated);
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