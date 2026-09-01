import { db } from "@/src/prisma/db";
import SkillsClient from "@/components/SkillsClient";
import { PageHeader } from "@/components/PageHeader";

export const metadata = {
  title: "Skills",
  description: "Technical skills, tools, and technologies I work with.",
};

export default async function SkillsPage() {
  const skills = await db.orm.public.Skill.all();
  return (
    <div>
      <PageHeader
        label="Capabilities"
        title="Skills Directory"
        description="A comprehensive list of technical skills, languages, tools, and frameworks I use."
      />
      <SkillsClient skills={skills} />
    </div>
  );
}
