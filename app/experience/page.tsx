import { db } from "@/src/prisma/db";

export const metadata = {
  title: "Experience - CVS CHARAN",
  description: "My professional experience and work history.",
};

export default async function ExperiencePage() {
  const experiences = await db.orm.public.Experience.all();

  return (
    <main className="min-h-screen bg-gray-50 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">Professional Experience</h1>
        
        <div className="relative border-l-2 border-primary/20 ml-3 md:ml-6 space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className="absolute w-6 h-6 bg-primary rounded-full -left-[13px] border-4 border-gray-50 top-1"></div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                  <span className="inline-block mt-2 md:mt-0 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {exp.period}
                  </span>
                </div>
                <h4 className="text-lg font-medium text-gray-600 mb-4">{exp.company}</h4>
                
                {exp.description && (
                  <div className="text-gray-600 whitespace-pre-wrap">{exp.description}</div>
                )}
              </div>
            </div>
          ))}

          {experiences.length === 0 && (
            <p className="text-gray-500 pl-8">No experience listed yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
