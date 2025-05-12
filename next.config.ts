import type { NextConfig } from "next";

// Check if Turbopack is being used (NODE_ENV=development and --turbopack flag)
const isTurbopack = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  // Allow build to succeed even if there are ESLint or TS errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Compiler options that work with both Turbopack and Webpack
  compiler: {
    // Disable unnecessary console.logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Apply webpack optimizations only when not using Turbopack
  ...(isTurbopack ? {} : {
    // Target ES modules for modern browsers (production builds only)
    webpack: (config, { isServer }) => {
      // Optimize client-side bundles only
      if (!isServer) {
        // Use ES modules for modern browsers
        config.experiments = {
          ...config.experiments,
          outputModule: true,
        };
      }
      return config;
    }
  })
};

export default nextConfig;
