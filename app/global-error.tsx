"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCcw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-white text-zinc-950 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center px-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 border border-red-100">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Critical System Error
          </h1>
          
          <p className="text-zinc-500 text-lg mb-8">
            A fatal error occurred at the root level of the application. Our engineering team has been notified.
          </p>

          <Button 
            size="lg" 
            onClick={() => reset()} 
            className="gap-2 w-full"
          >
            <RefreshCcw className="w-4 h-4" />
            Restart Application
          </Button>

          {error.digest && (
            <p className="mt-8 text-xs text-zinc-400">
              Error Reference: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  )
}
