import type { Metadata } from "next";
import { Inter, DM_Serif_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeToggle } from "@/components/ModeToggle";
import { MobileNav } from "@/components/MobileNav";
import { PageTracker } from "@/components/PageTracker";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CVS Charan — Full-Stack Engineer",
    template: "%s · CVS Charan",
  },
  description:
    "AI-Augmented Full-Stack Developer specialising in Next.js, cloud architecture, and data-driven web applications.",
  keywords: ["Full-Stack Developer", "Next.js", "TypeScript", "AI", "React", "Portfolio"],
  authors: [{ name: "CVS Charan" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CVS Charan",
    title: "CVS Charan — Full-Stack Engineer",
    description:
      "AI-Augmented Full-Stack Developer specialising in Next.js, cloud architecture, and data-driven web applications.",
  },
};

const NAV_LINKS = [
  { href: "/projects",   label: "Projects"   },
  { href: "/skills",     label: "Skills"     },
  { href: "/experience", label: "Experience" },
  { href: "/resume",     label: "Resume"     },
  { href: "/blog",       label: "Blog"       },
  { href: "/about",      label: "About"      },
  { href: "/contact",    label: "Contact"    },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerif.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageTracker />

          {/* ── Top Navigation Bar ── */}
          <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="max-w-6xl mx-auto px-6 md:px-10 flex h-14 items-center justify-between">
              {/* Wordmark */}
              <Link
                href="/"
                className="font-serif text-lg font-normal tracking-tight text-foreground hover:text-primary transition-colors"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                CVS Charan
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="nav-link text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <ModeToggle />
                <MobileNav />
              </div>
            </div>
          </header>

          {/* ── Page Content ── */}
          <main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
            {children}
          </main>

          {/* ── Footer ── */}
          <footer className="border-t border-border bg-background">
            <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground" style={{ fontFamily: "var(--font-dm-serif)" }}>
                CVS Charan
              </p>
              <p>Built with Next.js, Tailwind v4 &amp; Prisma.</p>
              <p>© {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
