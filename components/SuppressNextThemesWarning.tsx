"use client";

import { useEffect } from "react";

export function SuppressNextThemesWarning() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const originalError = console.error;
      console.error = (...args: any[]) => {
        if (
          typeof args[0] === "string" &&
          args[0].includes("Encountered a script tag while rendering React component")
        ) {
          return; // Suppress this specific React 19 / next-themes warning
        }
        originalError.apply(console, args);
      };
    }
  }, []);

  return null;
}
