import { NextResponse } from "next/server"

interface Project {
  id: string
  title: string
  slug: string
  description: string
  techStack: string[]
  githubUrl?: string
  demoUrl?: string
  imageUrl?: string
  order: number
}

// In-memory fallback (used if Prisma DB connection fails)
let projects: Project[] = [
  {
    id: "1",
    title: "Portfolio v5",
    slug: "portfolio-v5",
    description: "Next.js 16 portfolio with App Router",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/your-org/portfolio",
    demoUrl: "https://your-portfolio.vercel.app",
    imageUrl: "/projects/1.jpg",
    order: 0,
  },
]

// Try to import Prisma, fall back to in-memory if not available
let usePrisma = false
try {
  const { prisma } = await import("@/lib/prisma")
  // Test connection by counting projects
  const count = await prisma.project.count()
  usePrisma = count >= 0
} catch (e) {
  console.log("Prisma not available, using in-memory storage")
}

export async function GET() {
  if (usePrisma) {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    })
    return NextResponse.json(projects)
  }
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const body = await request.json()
  const project: Project = {
    id: Date.now().toString(),
    title: body.title,
    slug: body.slug,
    description: body.description,
    techStack: body.techStack,
    githubUrl: body.githubUrl,
    demoUrl: body.demoUrl,
    imageUrl: body.imageUrl,
    order: body.order ?? 0,
  }
  if (usePrisma) {
    const created = await prisma.project.create({ data: project })
    return NextResponse.json(created, { status: 201 })
  }
  // In-memory fallback
  projects.push(project)
  return NextResponse.json(project, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id } = body
  if (usePrisma) {
    const updated = await prisma.project.update({ where: { id }, data: body })
    return NextResponse.json(updated)
  }
  // In-memory fallback
  projects = projects.map((p) => (p.id === id ? { ...p, ...body } : p))
  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (usePrisma) {
    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ success: true })
  }
  // In-memory fallback
  if (id) {
    projects = projects.filter((p) => p.id !== id)
  }
  return NextResponse.json({ success: true })
}