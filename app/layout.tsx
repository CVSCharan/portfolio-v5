import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageTracker } from "@/components/PageTracker";
import { DynamicIslandNav } from "@/components/DynamicIslandNav";

/* ── Fonts ──────────────────────────────────────────── */
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ── Metadata ───────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "CVS Charan — Full-Stack Engineer",
    template: "%s · CVS Charan",
  },
  description:
    "AI-Augmented Full-Stack Developer specialising in Next.js, cloud architecture, and data-driven web applications.",
  keywords: [
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "AI",
    "React",
    "Portfolio",
    "CVS Charan",
  ],
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

/* ── Root Layout ────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${bricolage.variable} ${geistMono.variable}`}
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

          {/* ── Dynamic Island Navbar ── */}
          <DynamicIslandNav />

          {/* ── Page Content ── */}
          <main className="flex-1 w-full max-w-6xl mx-auto px-5 md:px-10 pt-28 pb-20">
            {children}
          </main>

          {/* ── Footer ── */}
          <footer className="border-t border-border bg-background">
            <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <span
                className="font-semibold text-foreground"
                style={{ fontFamily: "var(--font-bricolage)" }}
              >
                CVS Charan
              </span>
              <p>Built with Next.js 16, Tailwind v4 &amp; Prisma.</p>
              <p>© {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
