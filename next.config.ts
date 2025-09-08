import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Note: redirects() doesn't work with static export
  // Use client-side redirects or ensure all routes have trailing slashes
}

export default nextConfig