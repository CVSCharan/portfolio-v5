import { db } from "@/src/prisma/db";
import BlogClient from "@/components/BlogClient";
import { getPaginatedBlogs, getUniqueTags } from "@/app/actions/blogActions";

export const metadata = {
  title: "Blog",
  description: "Writing about software engineering, web development, AI, and more.",
};

export default async function BlogPage({ searchParams }: { searchParams: { tag?: string } }) {
  const tag = searchParams.tag;
  const blogs = await getPaginatedBlogs(0, 9, tag);
  const allTags = await getUniqueTags();

  return <BlogClient key={tag ?? "all"} initialBlogs={blogs} allTags={allTags} initialTag={tag} />;
}
