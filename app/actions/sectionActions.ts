"use server";

import { db } from "@/prisma/db";
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
  let sections = await db.sql`SELECT * FROM "resumeSection" ORDER BY "order" ASC`;

  // Seed if empty
  if (sections.length === 0) {
    for (const s of DEFAULT_SECTIONS) {
      await db.sql`
        INSERT INTO "resumeSection" (name, title, "order", visible)
        VALUES (${s.name}, ${s.title}, ${s.order}, true)
      `;
    }
    sections = await db.sql`SELECT * FROM "resumeSection" ORDER BY "order" ASC`;
  }

  return sections;
}

export async function updateSectionOrder(updates: { id: number; order: number; visible: boolean }[]) {
  // We do multiple updates
  for (const update of updates) {
    await db.sql`
      UPDATE "resumeSection"
      SET "order" = ${update.order}, visible = ${update.visible}
      WHERE id = ${update.id}
    `;
  }
  revalidatePath("/admin/sections");
}
