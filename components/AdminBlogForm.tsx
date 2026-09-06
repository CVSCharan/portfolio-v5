"use client";

import { createBlog, updateBlog } from "@/src/actions/blogs";
import { useRouter } from "next/navigation";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useState } from "react";

export function AdminBlogForm({ isNew, id, blog }: { isNew: boolean, id: string, blog?: any }) {
  const router = useRouter();
  
  const [content, setContent] = useState(blog?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function action(formData: FormData) {
    setIsSubmitting(true);
    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string || null,
      content: content || null,
      published: formData.get("published") === "on",
      readingTime: formData.get("readingTime") ? parseInt(formData.get("readingTime") as string, 10) : undefined,
    };

    if (isNew) {
      await createBlog(data);
    } else {
      await updateBlog(Number(id), data);
    }
    
    router.push("/admin/blogs");
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{isNew ? "Create Blog Post" : "Edit Blog Post"}</h1>
      
      <form action={action} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 shadow rounded space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input name="title" defaultValue={blog?.title || ""} required className="w-full border dark:border-gray-700 bg-transparent rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input name="slug" defaultValue={blog?.slug || ""} required className="w-full border dark:border-gray-700 bg-transparent rounded p-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <textarea name="excerpt" defaultValue={blog?.excerpt || ""} className="w-full border dark:border-gray-700 bg-transparent rounded p-2" rows={3}></textarea>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input name="published" type="checkbox" id="published" defaultChecked={blog?.published || false} className="w-4 h-4" />
              <label htmlFor="published" className="text-sm font-medium">Published</label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Reading Time (Override)</label>
              <input name="readingTime" type="number" min="0" placeholder="Auto-calculated" defaultValue={blog?.readingTime || ""} className="w-48 border dark:border-gray-700 bg-transparent rounded p-1 text-sm" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content (Markdown)</label>
          <MarkdownEditor value={content} onChange={setContent} />
        </div>
        
        <div className="pt-4 flex gap-4">
          <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={() => router.push("/admin/blogs")} className="px-6 py-2 border dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
        </div>
      </form>
    </div>
  );
}
