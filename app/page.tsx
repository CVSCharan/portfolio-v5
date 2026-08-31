import { db } from "@/src/prisma/db"
import { HomeClient } from "@/components/HomeClient"

export default async function HomePage() {
  const user = await db.orm.public.User.where({ email: "charan.cvs@gmail.com" }).all().first()
  
  return <HomeClient user={user} />
}
