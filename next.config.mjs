/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
  },
  // Disable WebSocket in development if not configured
  webpack: (config, { dev, isServer }) => {
    if (dev && !process.env.NEXT_PUBLIC_WS_URL) {
      console.log('WebSocket URL not configured, running in static mode')
    }
    return config
  }
}

export default nextConfig
