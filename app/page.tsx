import { db } from "@/src/prisma/db";
import { HomeClient } from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let user = null;
  let featuredProjects = [];
  let experiences = [];
  
  try {
    user = await db.orm.public.User.where({ email: "charan.cvs@gmail.com" }).all().first();
    if (!user) {
      user = await db.orm.public.User.all().first();
    }
    
    // Fetch top 2 projects for the Glimpse section
    featuredProjects = await db.orm.public.Project.orderBy({ order: "desc" }).take(2).all();
    
    // Fetch top 2 experiences for the Glimpse section
    experiences = await db.orm.public.Experience.orderBy({ id: "desc" }).take(2).all();
  } catch (error) {
    console.error("Failed to fetch data for home page:", error);
  }

  return <HomeClient user={user ?? null} featuredProjects={featuredProjects} experiences={experiences} />;
}
