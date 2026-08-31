import { NextResponse } from "next/server"
import { db } from "@/src/prisma/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { path, referrer, userAgent } = body

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 })
    }

    await db.orm.public.PageView.create({
      path,
      referrer: referrer || null,
      userAgent: userAgent || null,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving page view:", error)
    return NextResponse.json({ error: "Failed to record page view" }, { status: 500 })
  }
}
