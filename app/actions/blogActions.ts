"use server";

import { db } from "@/src/prisma/db";

export async function getPaginatedBlogs(skip: number, take: number) {
  const blogs = await db.orm.public.BlogPost
    .where({ published: true })
    .orderBy((p) => p.id.desc())
    .limit(take)
    .offset(skip)
    .all();

  return blogs;
}
