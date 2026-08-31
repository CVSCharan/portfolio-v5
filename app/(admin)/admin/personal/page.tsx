import { getUserProfile } from "@/app/actions/userActions";
import { PersonalForm } from "@/components/admin/PersonalForm";

export const dynamic = "force-dynamic";

export default async function PersonalPage() {
  const userProfile = await getUserProfile();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h1>
        <p className="text-gray-500">
          Manage your core identity details, bio, and your professional story.
        </p>
      </div>

      <PersonalForm initialData={userProfile} />
    </div>
  );
}
