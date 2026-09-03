import { db } from "@/src/prisma/db"
import { AboutClient } from "@/components/AboutClient"

export default async function AboutPage() {
  const skills = await db.orm.public.Skill.all()
  const user = await db.orm.public.User.where({ email: "charan.cvs@gmail.com" }).all().first()
  const certifications = await db.orm.public.Certification.orderBy((c) => c.order.asc()).limit(4).all()

  return <AboutClient skills={skills} user={user} certifications={certifications} />
}
