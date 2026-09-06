import { db } from "@/src/prisma/db";
import BlogClient from "@/components/BlogClient";

export const metadata = {
  title: "Blog",
  description: "Writing about software engineering, web development, AI, and more.",
};

export default async function BlogPage() {
  const blogs = await db.orm.public.BlogPost
    .where({ published: true })
    .orderBy((p) => p.id.desc())
    .limit(9)
    .all();

  return <BlogClient initialBlogs={blogs} />;
}
