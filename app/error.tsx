"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center space-y-6 px-4">
      <div className="w-14 h-14 rounded-full bg-muted border border-border flex items-center justify-center">
        <AlertTriangle className="w-6 h-6 text-foreground" />
      </div>

      <div className="space-y-2">
        <p className="text-label text-muted-foreground">Something went wrong</p>
        <h1
          className="text-headline text-foreground"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          Unexpected Error
        </h1>
        <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
          We encountered an unexpected error. Our team has been notified.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={() => reset()} className="btn btn-primary btn-md gap-2">
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </button>
        <Link href="/" className="btn btn-outline btn-md gap-2">
          <Home className="w-4 h-4" />
          Return Home
        </Link>
      </div>

      {error.digest && (
        <p className="text-xs text-muted-foreground">Ref: {error.digest}</p>
      )}
    </div>
  );
}
