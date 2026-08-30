import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // ESLint finds errors. It is recommended to fix errors before moving to
    // production. http://nextjs.org/docs/basic-configuration#-eslint
    ignoreDuringBuilds: true,
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
        source: "/:all",
        headers: [
          // Allow @ aliases in imports
          { key: "Content-Security-Policy", value: "default-src 'self' data: blob: 'self' https: http:;" },
        ],
      },
    ];
  },
};

export default nextConfig;