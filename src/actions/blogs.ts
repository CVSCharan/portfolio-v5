"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import readingTime from "reading-time";

const blogPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  excerpt: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  published: z.boolean().default(false),
  readingTime: z.number().int().min(0).optional(),
  tags: z.array(z.string()).default([]),
});

function normalizeTags(tags?: string[]) {
  if (!tags) return [];
  return Array.from(new Set(tags.map(t => t.trim().toLowerCase()).filter(Boolean)));
}

export async function createBlog(data: {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  published: boolean;
  readingTime?: number;
  tags?: string[];
}) {
  const validated = blogPostSchema.parse(data);
  let computedReadingTime = validated.readingTime;
  if (computedReadingTime === undefined && validated.content) {
    computedReadingTime = Math.ceil(readingTime(validated.content).minutes);
  }

  await db.orm.public.BlogPost.create({
    ...validated,
    tags: normalizeTags(validated.tags),
    readingTime: computedReadingTime || 0,
  });
  revalidatePath("/admin");
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
}

export async function updateBlog(id: number, data: {
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string | null;
  published?: boolean;
  readingTime?: number;
  tags?: string[];
}) {
  const validated = blogPostSchema.partial().parse(data);
  let computedReadingTime = validated.readingTime;
  if (computedReadingTime === undefined && validated.content) {
    computedReadingTime = Math.ceil(readingTime(validated.content).minutes);
  }

  const updateData = { ...validated };
  if (computedReadingTime !== undefined) {
    updateData.readingTime = computedReadingTime;
  }
  if (validated.tags !== undefined) {
    updateData.tags = normalizeTags(validated.tags);
  }

  await db.orm.public.BlogPost.where({ id }).update(updateData);
  revalidatePath("/admin");
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
}

export async function deleteBlog(id: number) {
  await db.orm.public.BlogPost.where({ id }).delete();
  revalidatePath("/admin");
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
}