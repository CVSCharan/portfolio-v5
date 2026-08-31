import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "CVS CHARAN - About",
  description:
    "Learn more about CVS CHARAN, frontend developer specializing in Next.js, React, and Tailwind CSS. View experience, skills, and contact information.",
  keywords:
    "CVS CHARAN, about, frontend developer, next.js, react, tailwind css, web development",
  openGraph: {
    title: "CVS CHARAN - About",
    description:
      "Learn more about CVS CHARAN, frontend developer specializing in Next.js, React, and Tailwind CSS.",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "CVS CHARAN About Page",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "CVS CHARAN - About",
    description:
      "Learn more about CVS CHARAN, frontend developer specializing in Next.js, React, and Tailwind CSS.",
    images: ["/favicon.ico"],
    creator: "@cvs_charan",
  },
}

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary to-secondary text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div>
            <Image
              src="/favicon.ico"
              alt="CVS CHARAN profile picture"
              width={400}
              height={400}
              className="rounded-full object-cover mb-8"
              style={{ border: "4px solid white" }}
            />
          </div>

          {/* Bio Section */}
          <div>
            <h1 className="text-5xl font-bold tracking-tight mb-4">
              Hi, I&apos;m {""}
            </h1>
            <h2 className="text-4xl font-light text-zinc-100 mb-8">
              Frontend Developer & Designer
            </h2>

            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              I build responsive, accessible, and performant web interfaces using
              modern technologies like Next.js, React, and Tailwind CSS. I love
              turning complex designs into clean, maintainable code.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="group border-zinc-700/50 rounded-lg p-6 hover:border-zinc-700/80 transition-colors">
                <p className="text-zinc-400 text-sm mb-2">Location</p>
                <p className="font-medium">San Francisco, CA</p>
              </div>
              <div className="group border-zinc-700/50 rounded-lg p-6 hover:border-zinc-700/80 transition-colors">
                <p className="text-zinc-400 text-sm mb-2">Email</p>
                <p className="font-medium mailto:cvs.charan@example.com">
                  cvs.charan@example.com
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium text-primary border-b pb-2 mb-4">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block rounded-md bg-primary/10 text-primary text-sm px-3 py-1">
                  React
                </span>
                <span className="inline-block rounded-md bg-primary/10 text-primary text-sm px-3 py-1">
                  Next.js
                </span>
                <span className="inline-block rounded-md bg-primary/10 text-primary text-sm px-3 py-1">
                  TypeScript
                </span>
                <span className="inline-block rounded-md bg-primary/10 text-primary text-sm px-3 py-1">
                  Tailwind CSS
                </span>
                <span className="inline-block rounded-md bg-primary/10 text-primary text-sm px-3 py-1">
                  JavaScript
                </span>
              </div>
            </div>

            <Link
              href="/projects"
              className="mt-6 inline-flex items-center rounded-md bg-white px-6 py-3 text-primary font-medium hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              View My Projects
              <svg
                className="ml-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}