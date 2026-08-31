import { db } from "@/src/prisma/db";
import { createSkill, updateSkill } from "@/src/actions/skills";
import { redirect } from "next/navigation";

export default async function AdminSkillForm({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  
  let skill = null;
  if (!isNew) {
    skill = await db.orm.public.Skill.where({ id: Number(params.id) }).first();
    if (!skill) redirect("/admin/skills");
  }

  async function action(formData: FormData) {
    "use server";
    
    const data = {
      name: formData.get("name") as string,
      level: Number(formData.get("level")),
      category: formData.get("category") as string,
    };

    if (isNew) {
      await createSkill(data);
    } else {
      await updateSkill(Number(params.id), data);
    }
    
    redirect("/admin/skills");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{isNew ? "Create Skill" : "Edit Skill"}</h1>
      
      <form action={action} className="space-y-4 bg-white p-6 shadow rounded">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input name="name" defaultValue={skill?.name || ""} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Level (0-100)</label>
          <input name="level" type="number" min="0" max="100" defaultValue={skill?.level || 50} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input name="category" defaultValue={skill?.category || ""} required className="w-full border rounded p-2" />
        </div>
        
        <div className="pt-4 flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save</button>
          <a href="/admin/skills" className="px-6 py-2 border rounded hover:bg-gray-50">Cancel</a>
        </div>
      </form>
    </div>
  );
}
