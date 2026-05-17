import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
};

export default config;
