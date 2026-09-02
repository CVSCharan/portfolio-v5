"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/* ─── Theme Toggle ─── */
function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="btn btn-ghost w-8 h-8 rounded-full p-0 flex items-center justify-center shrink-0"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}

/* ─── Nav Link ─── */
function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

/* ─── Mobile Drawer ─── */
function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-background/95"
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
                const isActive =
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className={`px-4 py-3.5 text-base font-medium rounded-xl transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {label}
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
            width: isExpanded ? "min(720px, calc(100vw - 32px))" : "220px",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="pointer-events-auto relative flex items-center justify-between h-12 px-4 rounded-full border border-border bg-background shadow-sm overflow-hidden"
        >
          {/* Wordmark — always visible */}
          <div className="flex items-center justify-start shrink-0 w-20">
            <Link
              href="/"
              className="font-bold text-base text-foreground tracking-tight"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              CVS
            </Link>
          </div>

          {/* Desktop nav links — animate in/out */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="hidden lg:flex items-center justify-center gap-6 flex-1 whitespace-nowrap"
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

          {/* Controls */}
          <div className="flex items-center justify-end gap-1 shrink-0 w-20">
            <ThemeToggle />
            {/* Hamburger menu: Show on mobile/tablet ONLY. Hidden on desktop. */}
            <div className="lg:hidden flex">
              <button
                className="btn btn-ghost w-8 h-8 rounded-full p-0 flex items-center justify-center"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Open menu"
              >
                {mobileOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
