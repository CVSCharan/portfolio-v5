import { db } from "@/src/prisma/db";
import { HomeClient } from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let user: any = null;
  let featuredProjects: any[] = [];
  let experiences: any[] = [];
  let latestPost: any = null;
  let latestExperiment: any = null;
  
  try {
    user = await db.orm.public.User.where({ email: "charan.cvs@gmail.com" }).all().first();
    if (!user) {
      user = await db.orm.public.User.all().first();
    }
    
    // Fetch top 2 projects for the Glimpse section
    featuredProjects = await db.orm.public.Project.orderBy((p) => p.order.desc()).limit(2).all();
    
    // Fetch top 2 experiences for the Glimpse section (Ascending because newest were inserted first in seed)
    experiences = await db.orm.public.Experience.orderBy((e) => e.id.asc()).limit(2).all();

    // Fetch the latest published blog post
    latestPost = await db.orm.public.BlogPost.where({ published: true }).orderBy((p) => p.id.desc()).limit(1).all().then(rows => rows[0] || null);

    // Fetch the latest lab experiment
    latestExperiment = await db.orm.public.Project.where({ isExperiment: true }).orderBy((p) => p.id.desc()).limit(1).all().then(rows => rows[0] || null);
  } catch (error) {
    console.error("Failed to fetch data for home page:", error);
  }

  return (
    <HomeClient 
      user={user ?? null} 
      featuredProjects={featuredProjects} 
      experiences={experiences} 
      latestPost={latestPost} 
      latestExperiment={latestExperiment} 
    />
  );
}
