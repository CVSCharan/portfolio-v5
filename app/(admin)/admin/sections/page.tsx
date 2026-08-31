import { getResumeSections } from "@/app/actions/sectionActions";
import { SectionReorder } from "@/components/admin/SectionReorder";

export const dynamic = "force-dynamic";

export default async function SectionsPage() {
  const sections = await getResumeSections();
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Sections</h1>
        <p className="text-gray-500">
          Drag and drop to reorder sections on your resume. Toggle visibility to show or hide them from the public view.
        </p>
      </div>

      <SectionReorder initialSections={sections} />
    </div>
  );
}
