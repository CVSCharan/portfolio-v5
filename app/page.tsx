import { db } from "@/src/prisma/db";
import { HomeClient } from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let user = null;
  try {
    user = await db.orm.public.User.where({ email: "charan.cvs@gmail.com" }).all().first();
    if (!user) {
      // fallback: grab any seeded user
      user = await db.orm.public.User.all().first();
    }
  } catch {
    // graceful degradation — HomeClient handles null user with defaults
  }

  return <HomeClient user={user ?? null} />;
}
