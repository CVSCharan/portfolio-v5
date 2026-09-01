import { PageTracker } from "@/components/PageTracker";
import { DynamicIslandNav } from "@/components/DynamicIslandNav";
import { Footer } from "@/components/Footer";
import { AIChatbot } from "@/components/AIChatbot";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageTracker />

      {/* ── Main Layout Wrapper (The Curtain) ── */}
      <div className="relative z-10 bg-background flex flex-col min-h-screen">
        {/* ── Dynamic Island Navbar ── */}
        <DynamicIslandNav />

        {/* ── Global AI Chatbot ── */}
        <AIChatbot />

        {/* ── Page Content ── */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-5 md:px-10 pt-28 pb-20">
          {children}
        </main>
      </div>

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}
