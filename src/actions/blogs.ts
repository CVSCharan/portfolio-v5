"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

export async function createBlog(data: {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  published: boolean;
}) {
  await db.orm.public.BlogPost.create(data);
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
  await db.orm.public.BlogPost.where({ id }).update(data);
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
