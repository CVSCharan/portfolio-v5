import Link from "next/link";
import { GitFork, Link2, Mail, Hash } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background pt-20 overflow-hidden border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 mb-20">
          {/* Col 1: Brand & Socials */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span
                className="text-4xl font-bold text-foreground"
                style={{
                  fontFamily: "var(--font-bricolage)",
                  letterSpacing: "-0.04em",
                }}
              >
                charan
              </span>
              <p className="text-sm text-muted-foreground max-w-[200px] leading-relaxed">
                AI-Augmented Full-Stack Developer from India
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <span className="text-xs text-muted-foreground">Find us at</span>
              <div className="flex items-center gap-4 text-muted-foreground">
                <a
                  href="https://linkedin.com/in/cvscharan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  <Link2 className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/CVSCharan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  <GitFork className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  <Hash className="w-5 h-5" />
                </a>
                <a
                  href="mailto:charan.cvs@gmail.com"
                  className="hover:text-foreground transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="mt-6 border border-border rounded-xl p-4 text-xs text-muted-foreground leading-relaxed max-w-[220px]">
              <p>© {new Date().getFullYear()} CVS Charan.</p>
              <p>All rights reserved.</p>
              <p className="mt-3">India — Available for remote worldwide.</p>
            </div>
          </div>

          {/* Col 2: Explore */}
          <div className="flex flex-col gap-5">
            <span className="text-label text-foreground">EXPLORE</span>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground font-medium">
              <Link
                href="/projects"
                className="hover:text-foreground transition-colors w-fit"
              >
                Projects
              </Link>
              <Link
                href="/skills"
                className="hover:text-foreground transition-colors w-fit"
              >
                Skills
              </Link>
              <Link
                href="/experience"
                className="hover:text-foreground transition-colors w-fit"
              >
                Experience
              </Link>
              <Link
                href="/resume"
                className="hover:text-foreground transition-colors w-fit"
              >
                Resume
              </Link>
              <Link
                href="/blog"
                className="hover:text-foreground transition-colors w-fit"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="hover:text-foreground transition-colors w-fit"
              >
                About
              </Link>
            </div>
          </div>

          {/* Col 3: Connect */}
          <div className="flex flex-col gap-5">
            <span className="text-label text-foreground">CONNECT</span>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground font-medium">
              <Link
                href="/contact"
                className="hover:text-foreground transition-colors w-fit"
              >
                Contact Me
              </Link>
              <a
                href="https://linkedin.com/in/cvscharan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors w-fit"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/CVSCharan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors w-fit"
              >
                GitHub
              </a>
              <a
                href="mailto:charan.cvs@gmail.com"
                className="hover:text-foreground transition-colors w-fit"
              >
                Email
              </a>
            </div>
          </div>

          {/* Col 4: Resources */}
          <div className="flex flex-col gap-5">
            <span className="text-label text-foreground">RESOURCES</span>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground font-medium">
              <a
                href="https://github.com/CVSCharan/portfolio-v5"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors w-fit"
              >
                Source Code
              </a>
              <Link
                href="/admin"
                className="hover:text-foreground transition-colors w-fit"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Huge bottom text */}
      <div className="w-full overflow-hidden pointer-events-none select-none flex justify-center">
        <h2
          className="text-[24vw] leading-[0.7] font-bold text-muted-foreground/10 whitespace-nowrap -mb-[4vw]"
          style={{
            fontFamily: "var(--font-bricolage)",
            letterSpacing: "-0.04em",
          }}
        >
          charan
        </h2>
      </div>
    </footer>
  );
}
