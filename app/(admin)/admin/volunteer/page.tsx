import { getVolunteerWork } from "@/app/actions/volunteerWorkActions";
import { VolunteerWorkClient } from "@/components/admin/VolunteerWorkClient";

export default async function VolunteerWorkPage() {
  const volunteerWork = await getVolunteerWork();
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8 border-b border-zinc-100 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Volunteer Work</h1>
        <p className="text-zinc-500 mt-1">Manage your volunteer experience and community contributions</p>
      </div>
      
      <VolunteerWorkClient initialData={volunteerWork} />
    </div>
  );
}
