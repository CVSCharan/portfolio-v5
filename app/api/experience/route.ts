import { NextResponse } from "next/server"

interface Experience {
  id: string
  title: string
  company: string
  period: string
  description?: string
}

// In-memory fallback
let experience: Experience[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Corp",
    period: "Jan 2023 – Present",
    description: "Built responsive web apps with React & Next.js",
  },
]

export async function GET() {
  return NextResponse.json([...experience])
}

export async function POST(request: Request) {
  const body = await request.json()
  const exp: Experience = {
    id: Date.now().toString(),
    title: body.title,
    company: body.company,
    period: body.period,
    description: body.description,
  }
  experience.push(exp)
  return NextResponse.json(exp, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id } = body
  experience = experience.map((e) => (e.id === id ? { ...e, ...body } : e))
  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (id) {
    experience = experience.filter((e) => e.id !== id)
  }
  return NextResponse.json({ success: true })
}