import { NextResponse } from "next/server"

interface Skill {
  id: string
  name: string
  level: number // 1-5
  category: string
}

// In-memory fallback
let skills: Skill[] = [
  { id: "1", name: "React", level: 5, category: "frontend" },
  { id: "2", name: "Next.js", level: 4, category: "frontend" },
  { id: "3", name: "TypeScript", level: 5, category: "frontend" },
  { id: "4", name: "Tailwind CSS", level: 4, category: "design" },
  { id: "5", name: "Node.js", level: 3, category: "backend" },
]

export async function GET() {
  return NextResponse.json([...skills])
}

export async function POST(request: Request) {
  const body = await request.json()
  const skill: Skill = {
    id: Date.now().toString(),
    name: body.name,
    level: body.level ?? 1,
    category: body.category,
  }
  skills.push(skill)
  return NextResponse.json(skill, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id } = body
  skills = skills.map((s) => (s.id === id ? { ...s, ...body } : s))
  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (id) {
    skills = skills.filter((s) => s.id !== id)
  }
  return NextResponse.json({ success: true })
}