import { db } from "@/src/prisma/db";
import Link from "next/link";
import { deleteExperience } from "@/src/actions/experiences";

export default async function AdminExperiencesPage() {
  const experiences = await db.orm.public.Experience.all();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Experiences</h1>
        <Link href="/admin/experiences/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add New Experience
        </Link>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Company</th>
              <th className="p-4">Period</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((e) => (
              <tr key={e.id} className="border-b">
                <td className="p-4">{e.title}</td>
                <td className="p-4">{e.company}</td>
                <td className="p-4">{e.period}</td>
                <td className="p-4 flex gap-2">
                  <Link href={`/admin/experiences/${e.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                  <form action={async () => {
                    "use server";
                    await deleteExperience(e.id);
                  }}>
                    <button type="submit" className="text-red-600 hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {experiences.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">No experiences found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
