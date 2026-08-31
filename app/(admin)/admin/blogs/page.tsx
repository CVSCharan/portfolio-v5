import { db } from "@/src/prisma/db";
import Link from "next/link";
import { deleteBlog } from "@/src/actions/blogs";

export default async function AdminBlogsPage() {
  const blogs = await db.orm.public.BlogPost.all();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
        <Link href="/admin/blogs/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add New Post
        </Link>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Published</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="p-4">{b.title}</td>
                <td className="p-4">{b.slug}</td>
                <td className="p-4">{b.published ? "Yes" : "No"}</td>
                <td className="p-4 flex gap-2">
                  <Link href={`/admin/blogs/${b.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                  <form action={async () => {
                    "use server";
                    await deleteBlog(b.id);
                  }}>
                    <button type="submit" className="text-red-600 hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">No blog posts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
