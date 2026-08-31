"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center space-y-6 px-4">
          <div className="w-14 h-14 rounded-full bg-muted border border-border flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-foreground" />
          </div>

          <div className="space-y-2">
            <p className="text-label text-muted-foreground">Critical System Error</p>
            <h1
              className="text-headline text-foreground"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              Application Error
            </h1>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              A fatal error occurred at the root level of the application. Our engineering team has been notified.
            </p>
          </div>

          <button onClick={() => reset()} className="btn btn-primary btn-md gap-2">
            <RefreshCcw className="w-4 h-4" />
            Restart Application
          </button>

          {error.digest && (
            <p className="text-xs text-muted-foreground">Ref: {error.digest}</p>
          )}
        </div>
      </body>
    </html>
  );
}
