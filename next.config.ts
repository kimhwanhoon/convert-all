import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  headers: async () => [
    {
      source: '/',
      headers: [
        {
          key: 'x-api-key',
          value: process.env.API_KEY || '3f9d8a7b-6c2e-4b1a-9f8e-2d7c6b5a4e3f',
        },
      ],
    },
  ],
};

export default nextConfig;
