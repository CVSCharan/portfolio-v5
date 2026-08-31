import { getEducation } from "@/app/actions/educationActions";
import { EducationClient } from "@/components/admin/EducationClient";

export const dynamic = "force-dynamic";

export default async function EducationPage() {
  const education = await getEducation();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Education History
        </h1>
        <p className="text-gray-500">
          Add, edit, and reorder your academic background.
        </p>
      </div>

      <EducationClient initialData={education} />
    </div>
  );
}
