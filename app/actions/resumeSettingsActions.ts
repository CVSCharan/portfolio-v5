"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

interface UpdateResumeSettingsInput {
  activeTemplate: string;
  activeTheme: string;
  activeLayout: string;
}

export async function updateResumeSettings(data: UpdateResumeSettingsInput) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

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
