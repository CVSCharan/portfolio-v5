import { db } from "@/src/prisma/db";
import { SettingsClient } from "@/components/admin/SettingsClient";
import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Settings | Admin",
  description: "Manage resume template, theme, and layout settings.",
};

export default async function SettingsPage() {
  const settings = await db.orm.public.ResumeSettings.all().then((r) => r[0] ?? null);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <PageHeader
        title="Resume Settings"
        description="Select how your public resume looks. Changes here will immediately sync to the live /resume route and PDF."
      />

      <SettingsClient
        initialTemplate={settings?.activeTemplate ?? "T1"}
        initialTheme={settings?.activeTheme ?? "blue"}
        initialLayout={settings?.activeLayout ?? "standard"}
      />
    </div>
  );
}
