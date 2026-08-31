import { db } from "@/src/prisma/db";
import { createBlog, updateBlog } from "@/src/actions/blogs";
import { redirect } from "next/navigation";

export default async function AdminBlogForm({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  
  let blog = null;
  if (!isNew) {
    blog = await db.orm.public.BlogPost.where({ id: Number(params.id) }).first();
    if (!blog) redirect("/admin/blogs");
  }

  async function action(formData: FormData) {
    "use server";
    
    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string || null,
      content: formData.get("content") as string || null,
      published: formData.get("published") === "on",
    };

    if (isNew) {
      await createBlog(data);
    } else {
      await updateBlog(Number(params.id), data);
    }
    
    redirect("/admin/blogs");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{isNew ? "Create Blog Post" : "Edit Blog Post"}</h1>
      
      <form action={action} className="space-y-4 bg-white p-6 shadow rounded">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input name="title" defaultValue={blog?.title || ""} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input name="slug" defaultValue={blog?.slug || ""} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Excerpt</label>
          <textarea name="excerpt" defaultValue={blog?.excerpt || ""} className="w-full border rounded p-2" rows={3}></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content (Markdown)</label>
          <textarea name="content" defaultValue={blog?.content || ""} className="w-full border rounded p-2 font-mono text-sm" rows={15}></textarea>
        </div>
        <div className="flex items-center gap-2">
          <input name="published" type="checkbox" id="published" defaultChecked={blog?.published || false} className="w-4 h-4" />
          <label htmlFor="published" className="text-sm font-medium">Published</label>
        </div>
        
        <div className="pt-4 flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save</button>
          <a href="/admin/blogs" className="px-6 py-2 border rounded hover:bg-gray-50">Cancel</a>
        </div>
      </form>
    </div>
  );
}
