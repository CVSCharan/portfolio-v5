"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function getSkills() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  return await db.orm.public.Skill.orderBy((s) => s.name.asc()).all();
}

export async function addSkill(data: {
  name: string;
  level: number;
  categories: string[];
}) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const result = await db.orm.public.Skill.create(data);
  revalidatePath("/admin/skills");
  return result;
}

export async function updateSkill(
  id: number,
  data: { name: string; level: number; categories: string[] },
) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await db.orm.public.Skill.where({ id }).update(data);
  revalidatePath("/admin/skills");
}

export async function deleteSkill(id: number) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await db.orm.public.Skill.where({ id }).delete();
  revalidatePath("/admin/skills");
}
