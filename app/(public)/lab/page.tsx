import { db } from "@/src/prisma/db";
import LabClient from "@/components/LabClient";

export const metadata = {
  title: "Lab | Experiments",
  description: "Technical work-in-progress, raw implementations, and unpolished experiments.",
};

export default async function LabPage() {
  const experiments = await db.orm.public.Project
    .where({ isExperiment: true })
    .orderBy((p) => p.order.asc())
    .all();

  return <LabClient experiments={experiments} />;
}
