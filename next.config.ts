import type { NextConfig } from "next";
import { config } from 'dotenv';

config({ path: './.env' });

const basePath = process.env.BASE_PATH || '';
const nextConfig: NextConfig = {
  /* config options here */
  basePath: basePath,
  assetPrefix: basePath+'/',
};
console.log('nextConfig:', nextConfig);

export default nextConfig;
