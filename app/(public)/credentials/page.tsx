import { db } from "@/src/prisma/db"
import { CredentialsClient } from "@/components/CredentialsClient"

export default async function CredentialsPage() {
  const certifications = await db.orm.public.Certification.orderBy((c) => c.order.asc()).all()

  return <CredentialsClient certifications={certifications} />
}
