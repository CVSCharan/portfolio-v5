import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SuppressNextThemesWarning } from "@/components/SuppressNextThemesWarning";

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
        <SuppressNextThemesWarning />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
