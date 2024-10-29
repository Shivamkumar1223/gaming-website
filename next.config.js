/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [], // Add any image domains you're using
  },
  // Enable static optimization
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
