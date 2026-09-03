"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

/* ── Metric item shape ─────────────────────────────────── */
const metricItemSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

/* ── Safe JSON parse for metrics ──────────────────────── */
 
function parseMetricsJson(raw: string | null): any | null {
  if (!raw || raw.trim() === "") return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(
      `Metrics must be valid JSON. Could not parse: ${raw.slice(0, 80)}`
    );
  }
  if (!Array.isArray(parsed)) {
    throw new Error("Metrics must be a JSON array, e.g. [{\"label\":\"Users\",\"value\":\"1.2k\"}]");
  }
  // Validate each item shape
  parsed.forEach((item, idx) => {
    const result = metricItemSchema.safeParse(item);
    if (!result.success) {
      throw new Error(
        `Metrics item ${idx + 1} is invalid: ${result.error.issues.map((i) => i.message).join(", ")}`
      );
    }
  });
  return parsed;
}

/* ── Shared project write schema ───────────────────────── */
const projectWriteSchema = z.object({
  title:           z.string().min(1).max(200),
  slug:            z.string().min(1).max(200).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  description:     z.string().nullable().optional(),
  fullDescription: z.string().nullable().optional(),
  highlights:      z.array(z.string()).default([]),
  category:        z.string().nullable().optional(),
  role:            z.string().nullable().optional(),
  timeline:        z.string().nullable().optional(),
  techStack:       z.array(z.string()).max(20).default([]),
  githubUrls:      z.array(z.string().url()).default([]),
  demoUrl:         z.string().url().nullable().optional(),
  imageUrl:        z.string().nullable().optional(),
  isFeatured:      z.boolean().default(false),
  isActive:        z.boolean().default(true),
  order:           z.number().int().min(0).default(0),
});

/* ── Types accepted by create/update ──────────────────── */
type ProjectInput = {
  title: string;
  slug: string;
  description: string | null;
  fullDescription: string | null;
  highlights: string[];
  category: string | null;
  role: string | null;
  timeline: string | null;
  techStack: string[];
  metricsRaw: string | null; // raw JSON string from form — validated here
  githubUrls: string[];
  demoUrl: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
  isActive: boolean;
  order: number;
};

function revalidateAll() {
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function createProject(data: ProjectInput) {
  const metrics = parseMetricsJson(data.metricsRaw);
  const { metricsRaw: _, ...rest } = data;
  const validated = projectWriteSchema.parse(rest);
  await db.orm.public.Project.create({ ...validated, metrics });
  revalidateAll();
}

export async function updateProject(id: number, data: Partial<ProjectInput>) {
  const metrics =
    "metricsRaw" in data ? parseMetricsJson(data.metricsRaw ?? null) : undefined;
  const { metricsRaw: _, ...rest } = data as ProjectInput;
  const validated = projectWriteSchema.partial().parse(rest);
  await db.orm.public.Project.where({ id }).update({
    ...validated,
    ...(metrics !== undefined ? { metrics } : {}),
  });
  revalidateAll();
}

export async function deleteProject(id: number) {
  await db.orm.public.Project.where({ id }).delete();
  revalidateAll();
}
