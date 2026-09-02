import { db } from "@/src/prisma/db";
import { ExperienceClient } from "@/components/ExperienceClient";

export const metadata = {
  title: "Experience",
  description:
    "My professional journey — roles, companies, and what I built along the way.",
};

export default async function ExperiencePage() {
  const experiences = await db.orm.public.Experience.orderBy((e) =>
    e.order.asc()
  ).all();

  return <ExperienceClient experiences={experiences} />;
}
