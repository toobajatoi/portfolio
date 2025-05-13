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
  trailingSlash: true,
}

module.exports = nextConfig 