"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

interface UpdateResumeSettingsInput {
  activeTemplate: string;
  activeTheme: string;
  activeLayout: string;
}

export async function updateResumeSettings(data: UpdateResumeSettingsInput) {
  const existing = await db.orm.public.ResumeSettings.all().then((r) => r[0] ?? null);

  if (existing) {
    await db.orm.public.ResumeSettings.where({ id: existing.id }).update({
      activeTemplate: data.activeTemplate,
      activeTheme: data.activeTheme,
      activeLayout: data.activeLayout,
    });
  } else {
    await db.orm.public.ResumeSettings.create({
      activeTemplate: data.activeTemplate,
      activeTheme: data.activeTheme,
      activeLayout: data.activeLayout,
    });
  }

  revalidatePath("/resume");
  revalidatePath("/admin/settings");
}
