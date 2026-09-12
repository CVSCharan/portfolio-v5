import type { NextConfig } from "next";

// Derive hostname from NEXT_PUBLIC_SITE_URL — same pattern as layout.tsx, sitemap.ts, robots.ts
// Domain changes in .env automatically propagate here; no hardcoded string duplication.
const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
);

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/api/og/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
      {
        protocol: "https",
        hostname: "iad.microlink.io",
      },
      // Allow next/image to serve OG-generated images from our own domain
      {
        protocol: siteUrl.protocol.replace(":", "") as "https" | "http",
        hostname: siteUrl.hostname,
      },
    ],
  },
  // Path aliases configuration
  // Allows @/path to resolve to ./src/path or ./app/path etc.
  async rewrites() {
    return [];
  },
  // Add module aliases support
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self' data: blob: https: http:",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:",
              "style-src 'self' 'unsafe-inline' https: http:",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' data: https: http:",
              "connect-src 'self' https: http: wss: ws:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;