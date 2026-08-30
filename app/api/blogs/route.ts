import { NextResponse } from "next/server"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content?: string
  date: string
  published: boolean
  viewCount: number
}

// In-memory fallback
let blogs: BlogPost[] = [
  {
    id: "1",
    title: "Why I built this portfolio",
    slug: "why-i-built-this-portfolio",
    excerpt: "A personal reflection on the motivation behind creating my portfolio website.",
    date: "2025-09-17",
    published: true,
    viewCount: 42,
  },
]

export async function GET() {
  return NextResponse.json([...blogs])
}

export async function POST(request: Request) {
  const body = await request.json()
  const blog: BlogPost = {
    id: Date.now().toString(),
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt,
    content: body.content,
    date: new Date().toISOString().split("T")[0],
    published: body.published ?? false,
    viewCount: 0,
  }
  blogs.push(blog)
  return NextResponse.json(blog, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id } = body
  blogs = blogs.map((b) => (b.id === id ? { ...b, ...body } : b))
  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (id) {
    blogs = blogs.filter((b) => b.id !== id)
  }
  return NextResponse.json({ success: true })
}