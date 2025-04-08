/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
