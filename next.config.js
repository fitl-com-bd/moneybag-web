/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.svgator.com"],
  },
}

module.exports = nextConfig
