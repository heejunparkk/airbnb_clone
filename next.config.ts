import type { NextConfig } from 'next';

// 개발 환경에서만 사용하세요
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
