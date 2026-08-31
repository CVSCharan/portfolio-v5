import { db } from "@/src/prisma/db";
import { HomeClient } from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let user = null;
  let featuredProject = null;
  
  try {
    user = await db.orm.public.User.where({ email: "charan.cvs@gmail.com" }).all().first();
    if (!user) {
      user = await db.orm.public.User.all().first();
    }
    
    // Fetch top featured project based on 'order' field
    featuredProject = await db.orm.public.Project.orderBy({ order: "desc" }).all().first();
  } catch (error) {
    console.error("Failed to fetch data for home page:", error);
  }

  return <HomeClient user={user ?? null} featuredProject={featuredProject ?? null} />;
}
