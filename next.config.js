/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'toobajatoi.github.io',
      },
    ],
  },
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',
}

module.exports = nextConfig 