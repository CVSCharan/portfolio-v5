"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function getCertifications() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  return await db.orm.public.Certification.orderBy((c) => c.order.asc()).all();
}

export async function addCertification(data?: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const result = await db.orm.public.Certification.create({
    title: data?.title || "New Certification",
    issuer: data?.issuer || "Issuing Organization",
    date: data?.date || "2024",
    url: data?.url || null,
    order: data?.order ?? 999,
  });
  revalidatePath("/admin/certifications");
  return result;
}

export async function updateCertification(id: number, data: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await db.orm.public.Certification.where({ id }).update({
    title: data.title,
    issuer: data.issuer || null,
    date: data.date || null,
    url: data.url || null,
  });
  revalidatePath("/admin/certifications");
}

export async function deleteCertification(id: number) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await db.orm.public.Certification.where({ id }).delete();
  revalidatePath("/admin/certifications");
}

export async function reorderCertifications(
  updates: { id: number; order: number }[],
) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  for (const update of updates) {
    await db.orm.public.Certification.where({ id: update.id }).update({
      order: update.order,
    });
  }
  revalidatePath("/admin/certifications");
}
