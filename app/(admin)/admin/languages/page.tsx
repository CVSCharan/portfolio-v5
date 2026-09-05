import { getLanguages } from "@/app/actions/languageActions";
import { LanguageClient } from "@/components/admin/LanguageClient";

export default async function LanguagesPage() {
  const languages = await getLanguages();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8 border-b border-zinc-100 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Languages</h1>
        <p className="text-zinc-500 mt-1">
          Manage your spoken and written languages
        </p>
      </div>

      <LanguageClient initialData={languages} />
    </div>
  );
}
