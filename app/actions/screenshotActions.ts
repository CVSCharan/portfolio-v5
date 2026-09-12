"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/src/prisma/db";
import { fetchMicrolinkScreenshot } from "@/lib/microlink";
import { revalidatePath } from "next/cache";

export async function regenerateProjectScreenshot(projectId: number) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  const project = await db.orm.public.Project.where({ id: projectId }).first();
  if (!project?.demoUrl) return { error: "No demo URL set" };

  const screenshotUrl = await fetchMicrolinkScreenshot(project.demoUrl);
  if (!screenshotUrl) return { error: "Screenshot generation failed — falling back to OG card" };

  await db.orm.public.Project.where({ id: projectId }).update({
    cachedScreenshotUrl: screenshotUrl,
    screenshotUpdatedAt: new Date(),
  });
  
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  
  return { success: true, screenshotUrl };
}
