import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
};

export default config;
