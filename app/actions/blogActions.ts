"use server";

import { db } from "@/src/prisma/db";

export async function getPaginatedBlogs(skip: number, take: number, tag?: string) {
  const blogs = await db.orm.public.BlogPost
    .where({ published: true })
    .orderBy((p) => p.id.desc())
    .all();

  const filtered = tag ? blogs.filter((b) => b.tags?.includes(tag)) : blogs;
  return filtered.slice(skip, skip + take);
}

export async function getUniqueTags() {
  const blogs = await db.orm.public.BlogPost.all();
  const tags = new Set<string>();
  for (const blog of blogs) {
    for (const tag of blog.tags || []) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}
