import { db } from "./db.ts";

async function main() {
  console.log("Seeding data...");

  const admin = await db.orm.public.Admin.create({
    username: "admin",
    password: "$2a$10$wYZkO411L4Q8w8n/4/fV2OTp.q0pQ.Qo4t/G9R/5xO4.n32p/R4q6", // admin123
  });
  console.log({ admin });

  const project1 = await db.orm.public.Project.create({
    title: "Portfolio v5",
    slug: "portfolio-v5",
    description: "Next.js 16 portfolio with App Router",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/your-org/portfolio",
    demoUrl: "https://your-portfolio.vercel.app",
    imageUrl: "/projects/1.jpg",
    order: 0,
  });
  console.log({ project1 });

  const skillsData = [
    { name: "React", level: 5, category: "frontend" },
    { name: "Next.js", level: 4, category: "frontend" },
    { name: "TypeScript", level: 5, category: "frontend" },
    { name: "Tailwind CSS", level: 4, category: "design" },
    { name: "Node.js", level: 3, category: "backend" },
  ];
  
  for (const skill of skillsData) {
    const s = await db.orm.public.Skill.create(skill);
    console.log({ skill: s });
  }

  const exp1 = await db.orm.public.Experience.create({
    title: "Frontend Developer",
    company: "Tech Corp",
    period: "Jan 2023 – Present",
    description: "Built responsive web apps with React & Next.js",
  });
  console.log({ exp1 });

  const blog1 = await db.orm.public.BlogPost.create({
    title: "Why I built this portfolio",
    slug: "why-i-built-this-portfolio",
    excerpt: "A personal reflection on the motivation behind creating my portfolio website.",
    published: true,
    viewCount: 42,
  });
  console.log({ blog1 });
}

main().catch(console.error);
