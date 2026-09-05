import { getCertifications } from "@/app/actions/certificationActions";
import { CertificationClient } from "@/components/admin/CertificationClient";

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8 border-b border-zinc-100 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Certifications</h1>
        <p className="text-zinc-500 mt-1">
          Manage your certifications and achievements
        </p>
      </div>

      <CertificationClient initialData={certifications} />
    </div>
  );
}
