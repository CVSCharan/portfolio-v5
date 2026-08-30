import { NextResponse } from "next/server"

interface Settings {
  siteName: string
  description: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
}

// In-memory fallback with defaults
let settings: { siteName: string; description: string; primaryColor: string; secondaryColor: string; accentColor: string } = {
  siteName: "CVS CHARAN Portfolio",
  description: "Personal portfolio website",
  primaryColor: "#0f172a",
  secondaryColor: "#14b8a6",
  accentColor: "#f59e0b",
}

export async function GET() {
  return NextResponse.json({ ...settings })
}

export async function PUT(request: Request) {
  const body = await request.json()
  settings = { ...settings, ...body }
  return NextResponse.json({ ...settings })
}