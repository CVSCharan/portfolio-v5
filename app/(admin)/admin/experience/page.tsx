import { getExperience } from "@/app/actions/experienceActions";
import { ExperienceClient } from "@/components/admin/ExperienceClient";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const experience = await getExperience();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Work Experience
        </h1>
        <p className="text-gray-500">
          Add, edit, and reorder your professional work experience.
        </p>
      </div>

      <ExperienceClient initialData={experience} />
    </div>
  );
}
