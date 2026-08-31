"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)

  // Close menu when route changes
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden rounded-full h-10 w-10 shrink-0" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-[calc(100%+1rem)] left-0 w-full bg-background border rounded-2xl p-6 shadow-xl flex flex-col gap-4 animate-in slide-in-from-top-2 md:hidden">
          <Link href="/projects" onClick={() => setIsOpen(false)} className="text-lg font-medium p-2 hover:bg-muted rounded-md transition-colors">
            Projects
          </Link>
          <Link href="/skills" onClick={() => setIsOpen(false)} className="text-lg font-medium p-2 hover:bg-muted rounded-md transition-colors">
            Skills
          </Link>
          <Link href="/experience" onClick={() => setIsOpen(false)} className="text-lg font-medium p-2 hover:bg-muted rounded-md transition-colors">
            Experience
          </Link>
          <Link href="/blog" onClick={() => setIsOpen(false)} className="text-lg font-medium p-2 hover:bg-muted rounded-md transition-colors">
            Blog
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg font-medium p-2 hover:bg-muted rounded-md transition-colors">
            About
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="text-lg font-medium p-2 hover:bg-muted rounded-md transition-colors">
            Contact
          </Link>
        </div>
      )}
    </>
  )
}
