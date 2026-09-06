import { db } from "@/src/prisma/db";
import { redirect } from "next/navigation";
import { AdminBlogForm } from "@/components/AdminBlogForm";

export default async function AdminBlogPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  
  let blog = null;
  if (!isNew) {
    blog = await db.orm.public.BlogPost.where({ id: Number(params.id) }).first();
    if (!blog) redirect("/admin/blogs");
  }

  return <AdminBlogForm isNew={isNew} id={params.id} blog={blog} />;
}
