import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-100">
          <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" className="font-bold text-xl text-primary">CVS CHARAN</a>
            <div className="flex gap-6 text-sm font-medium text-gray-600">
              <a href="/about" className="hover:text-primary transition-colors">About</a>
              <a href="/projects" className="hover:text-primary transition-colors">Projects</a>
              <a href="/skills" className="hover:text-primary transition-colors">Skills</a>
              <a href="/experience" className="hover:text-primary transition-colors">Experience</a>
              <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
              <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </nav>
        </header>
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
