import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <p className="text-label text-muted-foreground">404 — Not Found</p>
      <h1
        className="text-display text-foreground"
        style={{ fontFamily: "var(--font-bricolage)" }}
      >
        Lost in the void.
      </h1>
      <p className="text-muted-foreground max-w-sm leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary btn-md gap-2">
        <Home className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
