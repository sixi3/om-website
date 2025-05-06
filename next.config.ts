import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow build to succeed even if there are ESLint or TS errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
