"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

// Seed default sections if they don't exist
const DEFAULT_SECTIONS = [
  { name: "personal-info", title: "Personal Info", order: 0 },
  { name: "experience", title: "Experience", order: 1 },
  { name: "education", title: "Education", order: 2 },
  { name: "projects", title: "Projects", order: 3 },
  { name: "skills", title: "Skills", order: 4 },
  { name: "certifications", title: "Certifications", order: 5 },
  { name: "languages", title: "Languages", order: 6 },
  { name: "volunteer", title: "Volunteer Work", order: 7 },
];

export async function getResumeSections() {
  let sections = await db.orm.public.ResumeSection.orderBy((s) => s.order.asc()).all();

  // Seed if empty
  if (sections.length === 0) {
    for (const s of DEFAULT_SECTIONS) {
      await db.orm.public.ResumeSection.create({
        name: s.name,
        title: s.title,
        order: s.order,
        visible: true
      });
    }
    sections = await db.orm.public.ResumeSection.orderBy((s) => s.order.asc()).all();
  }

  return sections;
}

export async function updateSectionOrder(updates: { id: number; order: number; visible: boolean }[]) {
  for (const update of updates) {
    await db.orm.public.ResumeSection.where({ id: update.id }).update({
      order: update.order,
      visible: update.visible
    });
  }
  revalidatePath("/admin/sections");
}
