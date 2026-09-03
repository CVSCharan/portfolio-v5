import { db } from "@/src/prisma/db";
import SkillsClient from "@/components/SkillsClient";

export const metadata = {
  title: "Skills",
  description: "Technical skills, tools, and technologies I work with.",
};

export default async function SkillsPage() {
  const skills = await db.orm.public.Skill.orderBy((s) => s.level.desc()).all();
  const projects = await db.orm.public.Project.all();

  const skillsWithCounts = skills.map((skill) => {
    const count = projects.filter((p) => p.techStack.includes(skill.name)).length;
    return { ...skill, projectCount: count };
  });

  return <SkillsClient skills={skillsWithCounts} />;
}
