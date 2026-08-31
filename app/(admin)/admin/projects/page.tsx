import { db } from "@/src/prisma/db";
import Link from "next/link";
import { deleteProject } from "@/src/actions/projects";

export default async function AdminProjectsPage() {
  const projects = await db.orm.public.Project.all();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <Link href="/admin/projects/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add New Project
        </Link>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-4">{p.title}</td>
                <td className="p-4">{p.slug}</td>
                <td className="p-4 flex gap-2">
                  <Link href={`/admin/projects/${p.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                  <form action={async () => {
                    "use server";
                    await deleteProject(p.id);
                  }}>
                    <button type="submit" className="text-red-600 hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
