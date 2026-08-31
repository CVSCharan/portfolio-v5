"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const blogPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  excerpt: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  published: z.boolean().default(false),
});

export async function createBlog(data: {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  published: boolean;
}) {
  const validated = blogPostSchema.parse(data);
  await db.orm.public.BlogPost.create(validated);
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
}) {
  const validated = blogPostSchema.partial().parse(data);
  await db.orm.public.BlogPost.where({ id }).update(validated);
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