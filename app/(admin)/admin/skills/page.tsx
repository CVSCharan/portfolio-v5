import { getSkills } from "@/app/actions/skillActions";
import SkillClient from "@/components/admin/SkillClient";

export default async function SkillsPage() {
  const skills = await getSkills();
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8 border-b border-zinc-100 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Skills</h1>
        <p className="text-zinc-500 mt-1">Manage your technical skills and proficiency levels</p>
      </div>
      
      <SkillClient skills={skills} />
    </div>
  );
}
