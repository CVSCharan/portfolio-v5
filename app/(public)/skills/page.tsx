import { db } from "@/src/prisma/db";
import SkillsClient from "@/components/SkillsClient";

export const metadata = {
  title: "Skills",
  description: "Technical skills, tools, and technologies I work with.",
};

export default async function SkillsPage() {
  const skills = await db.orm.public.Skill.orderBy((s) => s.level.desc()).all();
  return <SkillsClient skills={skills} />;
}
