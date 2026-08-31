"use client" // Error boundaries must be Client Components

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCcw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6 border border-red-200 dark:border-red-900/50">
        <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Something went wrong
      </h1>
      
      <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
        We encountered an unexpected error while processing your request. Our team has been notified.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Button 
          size="lg" 
          onClick={() => reset()} 
          className="gap-2 w-full sm:w-auto"
        >
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          asChild 
          className="gap-2 w-full sm:w-auto"
        >
          <Link href="/">
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </Button>
      </div>
      
      {/* Optional: Show digest for support reference */}
      {error.digest && (
        <p className="mt-8 text-xs text-muted-foreground">
          Error Reference: {error.digest}
        </p>
      )}
    </div>
  )
}
