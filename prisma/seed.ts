import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding data...")

  // Create an initial admin (password: "admin123" - make sure to hash in production)
  // For this seed, we'll store it as plain text and when we implement NextAuth we will handle it.
  // Actually, let's use a bcrypt hash for 'admin123': $2b$10$wYZkO411L4Q8w8n/4/fV2OTp.q0pQ.Qo4t/G9R/5xO4.n32p/R4q6
  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      // This is a bcrypt hash for "admin123"
      password: "$2a$10$wYZkO411L4Q8w8n/4/fV2OTp.q0pQ.Qo4t/G9R/5xO4.n32p/R4q6", 
    },
  })
  console.log({ admin })

  // Seed Projects
  const project1 = await prisma.project.upsert({
    where: { slug: "portfolio-v5" },
    update: {},
    create: {
      title: "Portfolio v5",
      slug: "portfolio-v5",
      description: "Next.js 16 portfolio with App Router",
      techStack: ["Next.js", "React", "Tailwind CSS"],
      githubUrl: "https://github.com/your-org/portfolio",
      demoUrl: "https://your-portfolio.vercel.app",
      imageUrl: "/projects/1.jpg",
      order: 0,
    },
  })
  console.log({ project1 })

  // Seed Skills
  const skillsData = [
    { name: "React", level: 5, category: "frontend" },
    { name: "Next.js", level: 4, category: "frontend" },
    { name: "TypeScript", level: 5, category: "frontend" },
    { name: "Tailwind CSS", level: 4, category: "design" },
    { name: "Node.js", level: 3, category: "backend" },
  ]
  
  for (const skill of skillsData) {
    const s = await prisma.skill.create({
      data: skill,
    })
    console.log({ skill: s })
  }

  // Seed Experience
  const exp1 = await prisma.experience.create({
    data: {
      title: "Frontend Developer",
      company: "Tech Corp",
      period: "Jan 2023 – Present",
      description: "Built responsive web apps with React & Next.js",
    },
  })
  console.log({ exp1 })

  // Seed Blog Post
  const blog1 = await prisma.blogPost.upsert({
    where: { slug: "why-i-built-this-portfolio" },
    update: {},
    create: {
      title: "Why I built this portfolio",
      slug: "why-i-built-this-portfolio",
      excerpt: "A personal reflection on the motivation behind creating my portfolio website.",
      createdAt: new Date("2025-09-17"),
      published: true,
      viewCount: 42,
    },
  })
  console.log({ blog1 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
