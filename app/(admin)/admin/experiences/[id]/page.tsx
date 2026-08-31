import { db } from "@/src/prisma/db";
import { createExperience, updateExperience } from "@/src/actions/experiences";
import { redirect } from "next/navigation";

export default async function AdminExperienceForm({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  
  let experience = null;
  if (!isNew) {
    experience = await db.orm.public.Experience.where({ id: Number(params.id) }).first();
    if (!experience) redirect("/admin/experiences");
  }

  async function action(formData: FormData) {
    "use server";
    
    const data = {
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      period: formData.get("period") as string,
      description: formData.get("description") as string || null,
    };

    if (isNew) {
      await createExperience(data);
    } else {
      await updateExperience(Number(params.id), data);
    }
    
    redirect("/admin/experiences");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{isNew ? "Create Experience" : "Edit Experience"}</h1>
      
      <form action={action} className="space-y-4 bg-white p-6 shadow rounded">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input name="title" defaultValue={experience?.title || ""} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <input name="company" defaultValue={experience?.company || ""} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Period (e.g. 2021 - Present)</label>
          <input name="period" defaultValue={experience?.period || ""} required className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" defaultValue={experience?.description || ""} className="w-full border rounded p-2" rows={5}></textarea>
        </div>
        
        <div className="pt-4 flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save</button>
          <a href="/admin/experiences" className="px-6 py-2 border rounded hover:bg-gray-50">Cancel</a>
        </div>
      </form>
    </div>
  );
}
