import { getUserProfile } from "@/app/actions/userActions";
import { PersonalForm } from "@/components/admin/PersonalForm";

export const dynamic = "force-dynamic";

export default async function PersonalPage() {
  const userProfile = await getUserProfile();

  return (
    <div className="max-w-4xl mx-auto animate-fade-up">
      <div className="mb-8">
        <h1 className="text-headline text-foreground mb-2">Personal Information</h1>
        <p className="text-body-muted">
          Manage your core identity details, bio, and your professional story.
        </p>
      </div>

      <PersonalForm initialData={userProfile} />
    </div>
  );
}
