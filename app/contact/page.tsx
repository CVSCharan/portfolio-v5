import { PageHeader } from "@/components/PageHeader";
import { Mail, MapPin, GitFork, Link2 } from "lucide-react";

export const metadata = {
  title: "Contact",
  description: "Get in touch with CVS Charan.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl">
      <PageHeader
        label="Contact"
        title="Get in Touch"
        description="I'm currently open to new opportunities and interesting projects. Feel free to reach out."
      />

      <div className="grid md:grid-cols-[1fr_320px] gap-10">
        {/* ── Contact Form ── */}
        <form className="space-y-5" action="#" method="POST">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-label text-muted-foreground">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-label text-muted-foreground">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="subject" className="text-label text-muted-foreground">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="What's this about?"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="text-label text-muted-foreground">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              placeholder="Tell me about your project or opportunity..."
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none transition"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-md w-full sm:w-auto">
            Send Message
          </button>
        </form>

        {/* ── Info Card ── */}
        <div className="card p-6 space-y-6 h-fit">
          <div className="space-y-1">
            <p className="text-label text-muted-foreground">Direct Contact</p>
            <a
              href="mailto:charan.cvs@gmail.com"
              className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0" />
              charan.cvs@gmail.com
            </a>
          </div>

          <div className="space-y-1">
            <p className="text-label text-muted-foreground">Location</p>
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" />
              India — Remote Worldwide
            </div>
          </div>

          <div className="divider pt-2 space-y-3">
            <p className="text-label text-muted-foreground">Online</p>
            <a
              href="https://github.com/CVSCharan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <GitFork className="w-4 h-4 shrink-0" />
              GitHub — CVSCharan
            </a>
            <a
              href="https://linkedin.com/in/cvscharan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Link2 className="w-4 h-4 shrink-0" />
              LinkedIn — cvscharan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
