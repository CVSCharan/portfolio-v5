import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
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