import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export: Firebase Hosting serves plain files, no Node server.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
