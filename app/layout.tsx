import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeToggle } from "@/components/ModeToggle";
import { MobileNav } from "@/components/MobileNav";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CVS CHARAN - Portfolio",
  description: "Personal portfolio and blog of CVS CHARAN.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] flex flex-col bg-background text-foreground transition-colors duration-300 relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Subtle dot pattern background */}
          <div className="pointer-events-none fixed inset-0 z-[-1] h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
          
          {/* Larger Dynamic Island Navbar */}
          <header className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
            <nav className="relative pointer-events-auto flex items-center justify-between md:justify-start gap-4 md:gap-8 px-6 py-2 h-16 rounded-full border bg-background/80 backdrop-blur-md shadow-sm w-full md:w-auto max-w-4xl">
              <Link href="/" className="font-bold text-xl text-primary tracking-tight pr-4 md:border-r border-border shrink-0">
                CVS
              </Link>
              
              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-6 text-[15px] font-medium text-muted-foreground whitespace-nowrap">
                <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
                <Link href="/skills" className="hover:text-primary transition-colors">Skills</Link>
                <Link href="/experience" className="hover:text-primary transition-colors">Experience</Link>
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </div>

              {/* Theme Toggle & Mobile Nav */}
              <div className="flex items-center gap-2 shrink-0 ml-auto md:ml-0">
                <ModeToggle />
                <MobileNav />
              </div>
            </nav>
          </header>

          <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-12">
            {children}
          </main>
          
          <footer className="border-t py-6 md:py-0 bg-background mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row text-sm text-muted-foreground">
              <p>Built with Next.js 16, Tailwind v4 & Prisma.</p>
              <p>&copy; {new Date().getFullYear()} CVS CHARAN. All rights reserved.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
