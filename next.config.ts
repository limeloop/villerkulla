import type { NextConfig } from 'next';

const BASE_PREFIX_FOR_APP: string = process.env.BASE_PATH || '';

console.log('BASE_PREFIX_FOR_APP', BASE_PREFIX_FOR_APP);

interface Rewrite {
  source: string;
  destination: string;
}

const nextConfig: NextConfig = {
  basePath: BASE_PREFIX_FOR_APP,
  assetPrefix: BASE_PREFIX_FOR_APP + '/',
  async rewrites(): Promise<Rewrite[]> {
    return [
      {
        // ASSET PREFIX
        source: `${BASE_PREFIX_FOR_APP}/_next/:path*`,
        destination: '/_next/:path*',
      },
      {
        // IMAGE PREFIX
        source: `${BASE_PREFIX_FOR_APP}/images/:query*`,
        destination: '/_next/image/:query*',
      },
      {
        // API PREFIX
        source: `${BASE_PREFIX_FOR_APP}/api/:path*`,
        destination: '/api/:path*',
      },
    ];
  },
};

console.log(nextConfig);

export default nextConfig;
