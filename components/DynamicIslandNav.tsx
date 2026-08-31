"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/projects",   label: "Projects"   },
  { href: "/skills",     label: "Skills"     },
  { href: "/experience", label: "Experience" },
  { href: "/resume",     label: "Resume"     },
  { href: "/blog",       label: "Blog"       },
  { href: "/about",      label: "About"      },
  { href: "/contact",    label: "Contact"    },
];

/* ─── Theme Toggle ─── */
function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="btn btn-ghost w-8 h-8 rounded-full p-0 flex items-center justify-center shrink-0"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}

/* ─── Nav Link with active dot ─── */
function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
      {/* Active dot */}
      {isActive && (
        <motion.span
          layoutId="nav-dot"
          className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-primary"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

/* ─── Mobile Drawer ─── */
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Drawer panel */}
          <motion.div
            className="fixed inset-x-4 top-20 z-50 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
          >
            <nav className="flex flex-col p-2">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className={`px-4 py-3.5 text-base font-medium rounded-xl transition-colors flex items-center justify-between ${
                      isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {label}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Dynamic Island Nav ─── */
export function DynamicIslandNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
    if (latest > 60 && mobileOpen) setMobileOpen(false);
  });

  const isExpanded = !scrolled || hovered;

  return (
    <>
      <div className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{
            width: isExpanded ? "min(720px, calc(100vw - 32px))" : "200px",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="pointer-events-auto relative flex items-center h-12 px-4 rounded-full border border-border bg-background/80 backdrop-blur-xl shadow-sm overflow-hidden"
          style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          {/* Wordmark — always visible */}
          <Link
            href="/"
            className="shrink-0 font-bold text-base text-foreground tracking-tight mr-4"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            CVS
          </Link>

          {/* Desktop nav links — animate in/out */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="hidden md:flex items-center gap-6 flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {NAV_LINKS.map(({ href, label }) => (
                  <NavLink key={href} href={href} label={label} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Spacer so theme toggle stays right */}
          <div className="flex-1" />

          {/* Controls */}
          <div className="flex items-center gap-1 shrink-0">
            <ThemeToggle />
            {/* Hamburger menu: Show on mobile ALWAYS. Show on desktop ONLY WHEN collapsed (isExpanded is false) */}
            <button
              className={`btn btn-ghost w-8 h-8 rounded-full p-0 flex items-center justify-center ${
                isExpanded ? "md:hidden" : "flex"
              }`}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Open menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
