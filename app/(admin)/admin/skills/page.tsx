import { db } from "@/src/prisma/db";
import Link from "next/link";
import { deleteSkill } from "@/src/actions/skills";

export default async function AdminSkillsPage() {
  const skills = await db.orm.public.Skill.all();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Skills</h1>
        <Link href="/admin/skills/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add New Skill
        </Link>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Level</th>
              <th className="p-4">Category</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="p-4">{s.name}</td>
                <td className="p-4">{s.level}</td>
                <td className="p-4">{s.category}</td>
                <td className="p-4 flex gap-2">
                  <Link href={`/admin/skills/${s.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                  <form action={async () => {
                    "use server";
                    await deleteSkill(s.id);
                  }}>
                    <button type="submit" className="text-red-600 hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {skills.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">No skills found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
