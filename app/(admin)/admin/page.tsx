import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/src/prisma/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const projects = await db.orm.public.Project.all();
  const skills = await db.orm.public.Skill.all();
  const experiences = await db.orm.public.Experience.all();
  const blogs = await db.orm.public.BlogPost.all();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-headline mb-4">Welcome, {session.user?.name}</h2>
        <p className="text-body-muted">This is your admin dashboard where you can manage your portfolio content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <h3 className="text-label text-muted-foreground mb-2">Projects</h3>
          <p className="text-3xl font-bold font-mono tracking-tight">{projects.length}</p>
        </div>
        <div className="card p-6">
          <h3 className="text-label text-muted-foreground mb-2">Skills</h3>
          <p className="text-3xl font-bold font-mono tracking-tight">{skills.length}</p>
        </div>
        <div className="card p-6">
          <h3 className="text-label text-muted-foreground mb-2">Experiences</h3>
          <p className="text-3xl font-bold font-mono tracking-tight">{experiences.length}</p>
        </div>
        <div className="card p-6">
          <h3 className="text-label text-muted-foreground mb-2">Blog Posts</h3>
          <p className="text-3xl font-bold font-mono tracking-tight">{blogs.length}</p>
        </div>
      </div>
    </div>
  );
}
