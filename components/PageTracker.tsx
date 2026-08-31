"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function PageTracker() {
  const pathname = usePathname();
  const hasTracked = useRef(new Set<string>());

  useEffect(() => {
    // Only track if we haven't tracked this path yet to prevent dev double-firing
    if (pathname && !hasTracked.current.has(pathname)) {
      hasTracked.current.add(pathname);

      const trackPageView = async () => {
        try {
          await fetch("/api/analytics/pageview", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              path: pathname,
              referrer: document.referrer,
              userAgent: navigator.userAgent,
            }),
          });
        } catch (error) {
          console.error("Failed to track page view:", error);
        }
      };

      trackPageView();
    }
  }, [pathname]);

  return null;
}
