"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function getCertifications() {
  return await db.orm.public.Certification.orderBy((c) => c.order.asc()).all();
}

export async function addCertification() {
  const result = await db.orm.public.Certification.create({
    title: "New Certification",
    issuer: "Issuing Organization",
    date: "2024",
    url: null,
    order: 999,
  });
  revalidatePath("/admin/certifications");
  return result;
}

export async function updateCertification(id: number, data: any) {
  await db.orm.public.Certification.where({ id }).update({
    title: data.title,
    issuer: data.issuer || null,
    date: data.date || null,
    url: data.url || null,
  });
  revalidatePath("/admin/certifications");
}

export async function deleteCertification(id: number) {
  await db.orm.public.Certification.where({ id }).delete();
  revalidatePath("/admin/certifications");
}

export async function reorderCertifications(
  updates: { id: number; order: number }[],
) {
  for (const update of updates) {
    await db.orm.public.Certification.where({ id: update.id }).update({
      order: update.order,
    });
  }
  revalidatePath("/admin/certifications");
}
