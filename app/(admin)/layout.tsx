"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status !== "authenticated") {
    // If not authenticated, we could just render children (which handles login)
    // or a full-page loading state. The inner pages handle redirection.
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto h-screen relative">
        <div className="max-w-4xl mx-auto p-8 pb-24">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionProvider>
  );
}
