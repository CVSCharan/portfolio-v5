"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard,
  BarChart2,
  User, 
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  Wrench, 
  Award, 
  Languages, 
  HeartHandshake, 
  FileText,
  Settings,
  LogOut
} from "lucide-react";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart2 },
  { type: "divider" },
  { name: "Manage Sections", href: "/admin/sections", icon: Settings },
  { name: "Resume Settings", href: "/admin/settings", icon: FileText },
  { type: "divider" },
  { name: "Personal Info", href: "/admin/personal-info", icon: User },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Skills", href: "/admin/skills", icon: Wrench },
  { name: "Certifications", href: "/admin/certifications", icon: Award },
  { name: "Languages", href: "/admin/languages", icon: Languages },
  { name: "Volunteer Work", href: "/admin/volunteer", icon: HeartHandshake },
  { type: "divider" },
  { name: "Blog Posts", href: "/admin/blogs", icon: FileText },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold font-mono">
          C
        </div>
        <div>
          <h2 className="font-bold text-foreground leading-tight">CVS Charan</h2>
          <p className="text-label text-muted-foreground mt-1">Admin</p>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item, index) => {
          if (item.type === "divider") {
            return <div key={`divider-${index}`} className="h-px bg-border my-4 mx-2" />;
          }
          
          const Icon = item.icon!;
          const isActive = pathname === item.href; 
          
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium overflow-hidden ${
                isActive 
                  ? "bg-muted text-foreground" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
              )}
              <Icon size={18} className={isActive ? "text-secondary" : "text-muted-foreground opacity-70"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg transition-colors text-sm font-medium text-red-600 hover:bg-red-600/10"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
