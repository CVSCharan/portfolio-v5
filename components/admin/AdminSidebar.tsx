"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
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
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">
          R
        </div>
        <div>
          <h2 className="font-bold text-gray-900 leading-tight">Resume Builder</h2>
          <p className="text-xs text-gray-500">CMS Panel</p>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item, index) => {
          if (item.type === "divider") {
            return <div key={`divider-${index}`} className="h-px bg-gray-100 my-4 mx-2" />;
          }
          
          const Icon = item.icon!;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                isActive 
                  ? "bg-black text-white" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon size={18} className={isActive ? "text-white" : "text-gray-400"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg transition-colors text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
