import { db } from "@/src/prisma/db";

export const metadata = {
  title: "Skills - CVS CHARAN",
  description: "My technical skills and proficiencies.",
};

export default async function SkillsPage() {
  const skills = await db.orm.public.Skill.all();

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <main className="min-h-screen bg-gray-50 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">My Skills</h1>
        
        <div className="space-y-12">
          {Object.entries(groupedSkills).map(([category, items]) => (
            <div key={category} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map(skill => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {Object.keys(groupedSkills).length === 0 && (
            <p className="text-center text-gray-500">No skills added yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
