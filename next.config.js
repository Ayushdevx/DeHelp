/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000', 
        'github.com', 
        'avatars.githubusercontent.com',
        'lh3.googleusercontent.com',
        'googleusercontent.com'
      ],
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    domains: [
      'lh3.googleusercontent.com', 
      'googleusercontent.com', 
      'avatars.githubusercontent.com',
      'github.com',
      '*.githubusercontent.com', // Wildcard for GitHub image domains
      '*.googleusercontent.com', // Wildcard for Google user image domains
      'render.com' // If you're using Render for deployments
    ],
    unoptimized: false
  },
};

module.exports = nextConfig;