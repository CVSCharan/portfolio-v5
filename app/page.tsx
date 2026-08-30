import Image from "next/image"
import Link from "next/link"
{/* SEO Metadata generated dynamically in generateMetadata below */}

export const generateMetadata = {
  title: "CVS CHARAN - Portfolio",
  description:
    "Portfolio of CVS CHARAN, frontend developer specializing in Next.js, React, and Tailwind CSS. View projects, skills, and blog posts.",
  keywords:
    "CVS CHARAN, portfolio, next.js, react, tailwind css, frontend developer, web development",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "CVS CHARAN - Portfolio",
    description:
      "Portfolio of CVS CHARAN, frontend developer specializing in Next.js, React, and Tailwind CSS.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CVS CHARAN Portfolio Cover",
      },
    ],
    siteName: "CVS CHARAN Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "CVS CHARAN - Portfolio",
    description:
      "Portfolio of CVS CHARAN, frontend developer specializing in Next.js, React, and Tailwind CSS.",
    images: ["/og-image.jpg"],
    creator: "@cvs_charan",
  },
}

import { db } from "@/prisma/db"

export default async function Home() {
  const projectsCount = await db.orm.public.Project.count();
  const skillsCount = await db.orm.public.Skill.count();
  const expCount = await db.orm.public.Experience.count();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary to-secondary text-white py-12 px-6 font-sans">
      <div className="max-w-4xl w-full text-center">
        {/* Avatar */}
        <Image
          src="/favicon.ico"
          alt="CVS CHARAN avatar"
          width={180}
          height={180}
          className="rounded-full mb-8 object-cover"
          priority
        />

        {/* Hero Title */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Hi, I&apos;m CVS CHARAN
        </h1>

        <h2 className="text-4xl md:text-5xl font-light text-zinc-100 mb-8">
          Frontend Developer & Portfolio Designer
        </h2>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center sm:gap-6">
          <Link
            href="/projects"
            className="bg-accent text-primary px-8 py-4 rounded-full font-medium transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            View Projects
          </Link>
          <Link
            href="/about"
            className="bg-white/10 text-zinc-100 px-8 py-4 rounded-full font-medium transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            About Me
          </Link>
        </div>

        {/* Brief Stats */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mt-12 max-w-2xl mx-auto">
          <div className="group hover:bg-white/10 transition-colors rounded-lg p-6">
            <div className="text-3xl font-bold text-accent mb-2">{projectsCount}</div>
            <div className="text-zinc-300">Projects</div>
          </div>
          <div className="group hover:bg-white/10 transition-colors rounded-lg p-6">
            <div className="text-3xl font-bold text-accent mb-2">{skillsCount}</div>
            <div className="text-zinc-300">Skills</div>
          </div>
          <div className="group hover:bg-white/10 transition-colors rounded-lg p-6">
            <div className="text-3xl font-bold text-accent mb-2">{expCount}</div>
            <div className="text-zinc-300">Experience</div>
          </div>
          <div className="group hover:bg-white/10 transition-colors rounded-lg p-6">
            <div className="text-3xl font-bold text-accent mb-2">1</div>
            <div className="text-zinc-300">CMS</div>
          </div>
        </div>
      </div>
    </main>
  )
}