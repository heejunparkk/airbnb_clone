/** @type {import('next').NextConfig} */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // 개발 환경에서만 사용하세요

const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
